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
import { Plus, Search, ArrowUpDown, MoreVertical, Edit, Trash2, Loader2, Filter } from "lucide-react";
import { AddIncomeModal } from "./AddIncomeModal";
import { IncomeEmptyState } from "@/components/shared/empty-states";
import { ListSkeleton } from "@/components/ui/skeleton-loaders";
import { format } from "date-fns";
import { toast } from "sonner";
import { AppIcons } from "@/config/icons";
import { useTransactions } from "@/contexts/TransactionsContext";
import Fuse from "fuse.js";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  transaction_date: string;
}

export const IncomeList = () => {
  // Use centralized context instead of local state and queries
  const { incomeTransactions, loading, deleteTransaction } = useTransactions();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(incomeTransactions, {
      keys: ['description', 'category'],
      threshold: 0.3, // 0 = exact match, 1 = match anything
      ignoreLocation: true,
    });
  }, [incomeTransactions]);

  // Apply filters and sort using fuzzy search
  const filteredTransactions = useMemo(() => {
    let filtered = [...incomeTransactions];

    // Fuzzy search on description
    if (searchTerm.trim()) {
      const results = fuse.search(searchTerm);
      filtered = results.map(r => r.item);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Amount range filter
    if (minAmount) {
      filtered = filtered.filter(t => t.amount >= parseFloat(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(t => t.amount <= parseFloat(maxAmount));
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.transaction_date).getTime();
      const dateB = new Date(b.transaction_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [incomeTransactions, searchTerm, categoryFilter, sortOrder, minAmount, maxAmount, fuse]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  // Calculate totals for display
  const totalAmount = useMemo(() => {
    return incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  }, [incomeTransactions]);

  const filteredAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  const hasActiveFilters = searchTerm || categoryFilter !== "all" || minAmount || maxAmount;

  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      await deleteTransaction(deleteId);
      toast.success("Income deleted");
    } catch (error) {
      toast.error("Failed to delete income");
      console.error(error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditTransaction(null);
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
  if (!loading && incomeTransactions.length === 0) {
    return (
      <>
        <IncomeEmptyState
          onAddIncome={() => setShowAddModal(true)}
          onImport={() => toast.info("Import feature coming soon!")}
        />
        <AddIncomeModal
          open={showAddModal}
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
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search income... (try fuzzy: 'sal' finds 'Salary')"
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
          {!loading && incomeTransactions.length > 0 && hasActiveFilters && (
            <div className="flex items-center justify-between px-1 py-2 text-sm">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredTransactions.length}</span> of{" "}
                <span className="font-semibold text-foreground">{incomeTransactions.length}</span> transactions
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-success">€{formatCurrency(filteredAmount)}</span> of{" "}
                <span className="font-semibold text-success">€{formatCurrency(totalAmount)}</span>
              </p>
            </div>
          )}

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
                        <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
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
        onOpenChange={handleCloseModal}
        editTransaction={editTransaction}
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
