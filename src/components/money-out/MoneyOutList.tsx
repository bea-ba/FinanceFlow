import { useState, useEffect, useMemo } from "react";
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
import { Plus, Search, MoreVertical, Trash2, ArrowUpDown, Loader2, Edit, Filter, Copy } from "lucide-react";
import { AddExpenseModal } from "./AddExpenseModal";
import { SpendingEmptyState } from "@/components/shared/empty-states";
import { ListSkeleton } from "@/components/ui/skeleton-loaders";
import { toast } from "sonner";
import { format } from "date-fns";
import { AppIcons } from "@/config/icons";
import { useTransactions } from "@/contexts/TransactionsContext";
import Fuse from "fuse.js";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  transaction_date: string;
}

export const MoneyOutList = () => {
  // Use centralized context instead of local state and queries
  const { expenseTransactions, loading, deleteTransaction } = useTransactions();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Expense | null>(null);
  const [isDuplicateMode, setIsDuplicateMode] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(expenseTransactions, {
      keys: ['description', 'category'],
      threshold: 0.3,
      ignoreLocation: true,
    });
  }, [expenseTransactions]);

  // Apply filters and sort using fuzzy search
  const filteredExpenses = useMemo(() => {
    let filtered = [...expenseTransactions];

    // Fuzzy search on description
    if (searchTerm.trim()) {
      const results = fuse.search(searchTerm);
      filtered = results.map(r => r.item);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(e => e.category === categoryFilter);
    }

    // Amount range filter
    if (minAmount) {
      filtered = filtered.filter(e => e.amount >= parseFloat(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(e => e.amount <= parseFloat(maxAmount));
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.transaction_date).getTime();
      const dateB = new Date(b.transaction_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [expenseTransactions, searchTerm, categoryFilter, sortOrder, minAmount, maxAmount, fuse]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  // Calculate totals for display
  const totalAmount = useMemo(() => {
    return expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  }, [expenseTransactions]);

  const filteredAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, t) => sum + t.amount, 0);
  }, [filteredExpenses]);

  const hasActiveFilters = searchTerm || categoryFilter !== "all" || minAmount || maxAmount;

  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      await deleteTransaction(deleteId);
      toast.success("Expense deleted");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error(error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleEdit = (expense: Expense) => {
    setEditTransaction(expense);
    setIsDuplicateMode(false);
    setIsAddModalOpen(true);
  };

  const handleDuplicate = (expense: Expense) => {
    setEditTransaction(expense);
    setIsDuplicateMode(true);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditTransaction(null);
    setIsDuplicateMode(false);
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
  if (!loading && expenseTransactions.length === 0) {
    return (
      <>
        <SpendingEmptyState
          onAddExpense={() => setIsAddModalOpen(true)}
          onUploadReceipt={() => toast.info("Receipt upload coming soon!")}
        />
        <AddExpenseModal
          open={isAddModalOpen}
          onOpenChange={handleCloseModal}
          editTransaction={editTransaction}
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
              Add Manually
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3">
            {hasActiveFilters && (
              <div className="flex items-center gap-2 text-xs bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">
                <span className="text-primary font-medium">
                  🔍 {[
                    searchTerm && 'Search',
                    categoryFilter !== 'all' && 'Category',
                    minAmount && 'Min amount',
                    maxAmount && 'Max amount'
                  ].filter(Boolean).length} {[
                    searchTerm && 'Search',
                    categoryFilter !== 'all' && 'Category',
                    minAmount && 'Min amount',
                    maxAmount && 'Max amount'
                  ].filter(Boolean).length === 1 ? 'filter' : 'filters'} active
                </span>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setMinAmount("");
                    setMaxAmount("");
                  }}
                  className="ml-auto text-primary hover:text-primary/80 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses... (try fuzzy: 'groc' finds 'Groceries')"
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
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-xl"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={toggleSortOrder}
                className="rounded-xl"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortOrder === "desc" ? "Newest" : "Oldest"}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-3 p-4 bg-muted/50 rounded-xl">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Min Amount (€)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Max Amount (€)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="No limit"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMinAmount("");
                      setMaxAmount("");
                    }}
                    className="rounded-xl"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Count Indicator */}
          {!loading && expenseTransactions.length > 0 && hasActiveFilters && (
            <div className="flex items-center justify-between px-1 py-2 text-sm">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredExpenses.length}</span> of{" "}
                <span className="font-semibold text-foreground">{expenseTransactions.length}</span> transactions
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-destructive">€{formatCurrency(filteredAmount)}</span> of{" "}
                <span className="font-semibold text-destructive">€{formatCurrency(totalAmount)}</span>
              </p>
            </div>
          )}

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
                  setMinAmount("");
                  setMaxAmount("");
                }}
                className="text-info mt-2"
              >
                Clear all filters
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
                        -€{formatCurrency(Number(expense.amount))}
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
                        <DropdownMenuItem onClick={() => handleEdit(expense)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(expense)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
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
        onOpenChange={handleCloseModal}
        onSuccess={() => {}}
        editTransaction={editTransaction}
        isDuplicate={isDuplicateMode}
      />

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this expense transaction? This action cannot be undone.
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
