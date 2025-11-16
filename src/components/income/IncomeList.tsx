import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
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
import { Plus, Search, ArrowUpDown, MoreVertical, Edit, Trash2, Loader2 } from "lucide-react";
import { AddIncomeModal } from "./AddIncomeModal";
import { IncomeEmptyState } from "@/components/shared/empty-states";
import { ListSkeleton } from "@/components/ui/skeleton-loaders";
import { format } from "date-fns";
import { toast } from "sonner";
import { AppIcons } from "@/config/icons";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  transaction_date: string;
}

export const IncomeList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchIncomeTransactions();

    // Listen for transaction-added event to refresh data
    const handleTransactionAdded = () => {
      fetchIncomeTransactions();
    };

    window.addEventListener('transaction-added', handleTransactionAdded);

    return () => {
      window.removeEventListener('transaction-added', handleTransactionAdded);
    };
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [transactions, searchTerm, categoryFilter, sortOrder]);

  const fetchIncomeTransactions = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('type', 'income')
      .order('transaction_date', { ascending: false });

    if (data) {
      setTransactions(data);
    }
    setLoading(false);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.transaction_date).getTime();
      const dateB = new Date(b.transaction_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTransactions(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', deleteId);

    if (error) {
      toast.error("Failed to delete income");
    } else {
      toast.success("Income deleted");
      fetchIncomeTransactions();
      // Dispatch event to refresh all components
      window.dispatchEvent(new Event('transaction-added'));
    }
    setDeleting(false);
    setDeleteId(null);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'salary':
        return AppIcons.financial.income;
      case 'freelance':
        return AppIcons.financial.balance;
      default:
        return AppIcons.financial.money;
    }
  };

  // Show empty state if no transactions at all
  if (!loading && transactions.length === 0) {
    return (
      <>
        <IncomeEmptyState
          onAddIncome={() => setShowAddModal(true)}
          onImport={() => toast.info("Import feature coming soon!")}
        />
        <AddIncomeModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onSuccess={fetchIncomeTransactions}
        />
      </>
    );
  }

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Income History</CardTitle>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Manually
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search income..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="other_income">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={toggleSortOrder}
              className="rounded-xl"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {sortOrder === "desc" ? "Newest" : "Oldest"}
            </Button>
          </div>

          {/* List */}
          {loading ? (
            <ListSkeleton count={4} />
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No income found matching your filters
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
                className="text-info mt-2"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => {
                const Icon = getCategoryIcon(transaction.category);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-all"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mint-tint flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                        {" • "}
                        {format(new Date(transaction.transaction_date), "MMM d, yyyy")}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">
                        +€{formatCurrency(Number(transaction.amount))}
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
                        <DropdownMenuItem
                          onClick={() => handleDelete(transaction.id)}
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

      <AddIncomeModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSuccess={fetchIncomeTransactions}
      />

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Income Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this income transaction? This action cannot be undone.
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
