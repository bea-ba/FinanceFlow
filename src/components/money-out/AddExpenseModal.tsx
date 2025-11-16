import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTransactions } from "@/contexts/TransactionsContext";
import { suggestCategory, getCategoryLabel } from "@/lib/categoryHints";
import { expenseSchema } from "@/lib/validationSchemas";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  transaction_date: string;
}

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editTransaction?: Transaction | null;
  isDuplicate?: boolean;
}

export const AddExpenseModal = ({ open, onOpenChange, onSuccess, editTransaction, isDuplicate = false }: AddExpenseModalProps) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const [loading, setLoading] = useState(false);
  const [showFutureDateConfirm, setShowFutureDateConfirm] = useState(false);
  const [showLargeAmountConfirm, setShowLargeAmountConfirm] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [formData, setFormData] = useState({
    category: "other_expense",
    amount: "",
    description: "",
    transaction_date: new Date().toISOString().split('T')[0]
  });

  // Populate form when editing or get remembered category
  useEffect(() => {
    if (editTransaction) {
      setFormData({
        category: editTransaction.category,
        amount: editTransaction.amount.toString(),
        description: editTransaction.description || "",
        transaction_date: editTransaction.transaction_date
      });
    } else {
      // Reset form when adding new, using remembered category if available
      const rememberedCategory = localStorage.getItem('lastExpenseCategory') || "other_expense";
      setFormData({
        category: rememberedCategory,
        amount: "",
        description: "",
        transaction_date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editTransaction, open]);

  // Smart category suggestion based on description
  const suggestedCategory = useMemo(() => {
    if (!formData.description || hintDismissed || editTransaction) return null;
    const suggestion = suggestCategory(formData.description, 'expense');
    // Only suggest if different from current category
    return suggestion && suggestion !== formData.category ? suggestion : null;
  }, [formData.description, formData.category, hintDismissed, editTransaction]);

  // Reset hint dismissed when description changes significantly
  useEffect(() => {
    setHintDismissed(false);
  }, [formData.description]);

  const saveExpense = async () => {
    setLoading(true);

    try {
      const transactionData = {
        type: 'expense' as const,
        category: formData.category as any,
        amount: parseFloat(formData.amount),
        description: formData.description,
        transaction_date: formData.transaction_date
      };

      if (editTransaction && !isDuplicate) {
        // Update existing transaction
        await updateTransaction(editTransaction.id, transactionData);
      } else {
        // Insert new transaction (either new or duplicate)
        await addTransaction(transactionData);
        // Remember category for next time
        localStorage.setItem('lastExpenseCategory', formData.category);
      }

      toast.success(editTransaction && !isDuplicate ? "Expense updated successfully" : (isDuplicate ? "Expense duplicated successfully" : "Expense added successfully"));
      onOpenChange(false);
      onSuccess();
      setFormData({
        category: "other_expense",
        amount: "",
        description: "",
        transaction_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error saving expense:', error);
      toast.error(editTransaction ? "Failed to update expense" : "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse amount for validation
    const amount = parseFloat(formData.amount);

    // Validate using Zod schema
    const validationResult = expenseSchema.safeParse({
      type: 'expense',
      category: formData.category,
      amount: amount,
      description: formData.description || undefined,
      transaction_date: formData.transaction_date,
    });

    if (!validationResult.success) {
      // Show first validation error
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    // Check for unusually large amounts (UX enhancement, not validation)
    if (amount > 5000 && !editTransaction) {
      setShowLargeAmountConfirm(true);
      return;
    }

    // Check if date is in the future (UX enhancement, not validation)
    const selectedDate = new Date(formData.transaction_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setShowFutureDateConfirm(true);
      return;
    }

    await saveExpense();
  };

  const handleConfirmFutureDate = async () => {
    setShowFutureDateConfirm(false);
    await saveExpense();
  };

  const handleCancelFutureDate = () => {
    setShowFutureDateConfirm(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isDuplicate ? "Duplicate expense" : (editTransaction ? "Edit expense" : "Add expense manually")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (€)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                max="1000000"
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                className="text-lg"
              />
              {parseFloat(formData.amount) > 5000 && (
                <p className="text-xs text-amber-600">Large amount - you'll be asked to confirm</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="e.g., Weekly groceries at Tesco, Electric bill"
              />
              {parseFloat(formData.amount) > 500 && !formData.description && (
                <p className="text-xs text-amber-600">💡 Tip: Adding a description helps track large expenses</p>
              )}
              {suggestedCategory && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">💡 Looks like</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({...formData, category: suggestedCategory});
                      setHintDismissed(true);
                    }}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {getCategoryLabel(suggestedCategory, 'expense')}
                  </button>
                  <span className="text-muted-foreground">?</span>
                  <button
                    type="button"
                    onClick={() => setHintDismissed(true)}
                    className="ml-auto text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.transaction_date}
                onChange={(e) => setFormData({...formData, transaction_date: e.target.value})}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (editTransaction ? "Saving..." : "Adding...") : (editTransaction ? "Save changes" : "Add expense")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showFutureDateConfirm} onOpenChange={setShowFutureDateConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Future Date Selected</AlertDialogTitle>
            <AlertDialogDescription>
              You're adding this transaction for a future date. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading} onClick={handleCancelFutureDate}>Cancel</AlertDialogCancel>
            <Button variant="outline" disabled={loading} onClick={() => setShowFutureDateConfirm(false)}>
              Change Date
            </Button>
            <AlertDialogAction disabled={loading} onClick={handleConfirmFutureDate}>
              {loading ? "Saving..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showLargeAmountConfirm} onOpenChange={setShowLargeAmountConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Large Expense Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You're adding €{parseFloat(formData.amount).toLocaleString()} as an expense. Please confirm this is correct.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading} onClick={() => setShowLargeAmountConfirm(false)}>Cancel</AlertDialogCancel>
            <Button variant="outline" disabled={loading} onClick={() => setShowLargeAmountConfirm(false)}>
              Edit Amount
            </Button>
            <AlertDialogAction disabled={loading} onClick={async () => {
              setShowLargeAmountConfirm(false);
              await saveExpense();
            }}>
              {loading ? "Saving..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
