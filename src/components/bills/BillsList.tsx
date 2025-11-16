import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Calendar, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { AddBillModal } from "./AddBillModal";
import { BillsEmptyState } from "@/components/shared/empty-states";
import { ListSkeleton } from "@/components/ui/skeleton-loaders";
import { format } from "date-fns";
import { toast } from "sonner";
import { AppIcons } from "@/config/icons";
import { useDebounce } from "@/hooks/use-debounce";

interface Bill {
  id: string;
  name: string;
  amount: number;
  category: string;
  due_day: number;
  frequency: string;
  status: "paid" | "unpaid" | "overdue";
  next_due_date: string;
}

export const BillsList = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState<Bill[]>([]);
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Debounce search term to reduce re-renders
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bills, debouncedSearchTerm, statusFilter]);

  const fetchBills = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('bills')
      .select('*')
      .eq('is_active', true)
      .order('next_due_date', { ascending: true });

    if (error) {
      console.error('Error fetching bills:', error);
      toast.error('Failed to load bills');
    } else if (data) {
      setBills(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...bills];

    if (debouncedSearchTerm) {
      filtered = filtered.filter(bill =>
        bill.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(bill => bill.status === statusFilter);
    }

    setFilteredBills(filtered);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('bills')
        .update({ is_active: false })
        .eq('id', deleteId);

      if (error) throw error;

      toast.success("Bill deleted");
      fetchBills();
    } catch (error) {
      toast.error("Failed to delete bill");
      console.error(error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    const bill = bills.find(b => b.id === id);
    if (!bill) return;

    // Calculate next due date based on frequency
    const currentDueDate = new Date(bill.next_due_date);
    let nextDueDate = new Date(currentDueDate);

    switch (bill.frequency) {
      case 'weekly':
        nextDueDate.setDate(currentDueDate.getDate() + 7);
        break;
      case 'monthly':
        nextDueDate.setMonth(currentDueDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDueDate.setFullYear(currentDueDate.getFullYear() + 1);
        break;
    }

    const { error } = await supabase
      .from('bills')
      .update({
        status: 'paid',
        last_paid_date: new Date().toISOString().split('T')[0],
        next_due_date: nextDueDate.toISOString().split('T')[0]
      })
      .eq('id', id);

    if (error) {
      toast.error("Failed to mark bill as paid");
    } else {
      toast.success("Bill marked as paid");
      fetchBills();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'utilities':
        return AppIcons.financial.wallet;
      case 'housing':
        return AppIcons.navigation.home;
      case 'insurance':
        return AppIcons.status.shield;
      default:
        return AppIcons.financial.money;
    }
  };

  // Show empty state if no bills at all
  if (!loading && bills.length === 0) {
    return (
      <>
        <BillsEmptyState
          onAddBill={() => setShowAddModal(true)}
          onScanEmail={() => toast.info("Email scanning coming soon!")}
        />
        <AddBillModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onSuccess={fetchBills}
        />
      </>
    );
  }

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">All Bills</CardTitle>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Bill
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* List */}
          {loading ? (
            <ListSkeleton count={4} />
          ) : filteredBills.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No bills found matching your filters
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="text-info mt-2"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBills.map((bill) => {
                const Icon = getCategoryIcon(bill.category);
                return (
                  <div
                    key={bill.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-all"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-tint flex items-center justify-center">
                      <Icon className="h-5 w-5 text-info" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground truncate">
                          {bill.name}
                        </p>
                        <Badge
                          variant={bill.status === 'paid' ? 'default' : bill.status === 'overdue' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {bill.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bill.frequency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{bill.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {format(new Date(bill.next_due_date), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        €{Number(bill.amount).toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {bill.status === 'unpaid' && (
                          <DropdownMenuItem onClick={() => handleMarkAsPaid(bill.id)}>
                            <AppIcons.status.checkCircle className="mr-2 h-4 w-4" />
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(bill.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AddBillModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSuccess={fetchBills}
      />

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bill? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
