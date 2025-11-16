import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Trash2, ArrowUpDown } from "lucide-react";
import { AddExpenseModal } from "./AddExpenseModal";
import { SpendingEmptyState } from "@/components/shared/empty-states";
import { ListSkeleton } from "@/components/ui/skeleton-loaders";
import { toast } from "sonner";
import { format } from "date-fns";
import { AppIcons } from "@/config/icons";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  transaction_date: string;
}

export const MoneyOutList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [expenses, searchTerm, categoryFilter, sortOrder]);

  const fetchExpenses = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('type', 'expense')
      .order('transaction_date', { ascending: false });

    if (error) {
      toast.error("Failed to load expenses");
      console.error(error);
    } else {
      setExpenses(data || []);
    }
    setLoading(false);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...expenses];

    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(expense => expense.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.transaction_date).getTime();
      const dateB = new Date(b.transaction_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredExpenses(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete expense");
    } else {
      toast.success("Expense deleted");
      fetchExpenses();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'groceries':
        return AppIcons.financial.balance;
      case 'dining':
        return AppIcons.financial.money;
      case 'transport':
        return AppIcons.financial.creditCard;
      case 'utilities':
        return AppIcons.financial.balance;
      case 'entertainment':
        return AppIcons.analytics.activity;
      case 'shopping':
        return AppIcons.financial.creditCard;
      default:
        return AppIcons.financial.expense;
    }
  };

  const formatCategoryName = (category: string) => {
    const names: Record<string, string> = {
      groceries: "Groceries",
      dining: "Dining Out",
      transport: "Transportation",
      utilities: "Utilities",
      entertainment: "Entertainment",
      shopping: "Shopping",
      health: "Healthcare",
      education: "Education",
      other_expense: "Other"
    };
    return names[category] || category;
  };

  // Show empty state if no expenses at all
  if (!loading && expenses.length === 0) {
    return (
      <>
        <SpendingEmptyState
          onAddExpense={() => setIsAddModalOpen(true)}
          onUploadReceipt={() => toast.info("Receipt upload coming soon!")}
        />
        <AddExpenseModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSuccess={fetchExpenses}
        />
      </>
    );
  }

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Expense History</CardTitle>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px] rounded-xl">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="dining">Dining Out</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other_expense">Other</SelectItem>
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
          ) : filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No expenses found matching your filters
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
              {filteredExpenses.map((expense) => {
                const Icon = getCategoryIcon(expense.category);
                return (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-all"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-coral-tint flex items-center justify-center">
                      <Icon className="h-5 w-5 text-warning" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {expense.description || "No description"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCategoryName(expense.category)}
                        {" • "}
                        {format(new Date(expense.transaction_date), "MMM d, yyyy")}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-destructive">
                        -€{Number(expense.amount).toFixed(2)}
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
                          onClick={() => handleDelete(expense.id)}
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

      <AddExpenseModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={fetchExpenses}
      />
    </>
  );
};
