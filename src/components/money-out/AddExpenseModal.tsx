import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
}

export const AddExpenseModal = ({ open, onOpenChange, onSuccess, editTransaction }: AddExpenseModalProps) => {
  const [loading, setLoading] = useState(false);
  const [showFutureDateConfirm, setShowFutureDateConfirm] = useState(false);
  const [formData, setFormData] = useState({
    category: "other_expense",
    amount: "",
    description: "",
    transaction_date: new Date().toISOString().split('T')[0]
  });

  // Populate form when editing
  useEffect(() => {
    if (editTransaction) {
      setFormData({
        category: editTransaction.category,
        amount: editTransaction.amount.toString(),
        description: editTransaction.description || "",
        transaction_date: editTransaction.transaction_date
      });
    } else {
      // Reset form when adding new
      setFormData({
        category: "other_expense",
        amount: "",
        description: "",
        transaction_date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editTransaction, open]);

  const saveExpense = async () => {
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in");
        return;
      }

      const transactionData = {
        type: 'expense' as const,
        category: formData.category as any,
        amount: parseFloat(formData.amount),
        description: formData.description,
        transaction_date: formData.transaction_date
      };

      let error;
      if (editTransaction) {
        // Update existing transaction
        const { error: updateError } = await supabase
          .from('transactions')
          .update(transactionData)
          .eq('id', editTransaction.id);
        error = updateError;
      } else {
        // Insert new transaction
        const { error: insertError } = await supabase
          .from('transactions')
          .insert([{ ...transactionData, user_id: session.user.id }]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(editTransaction ? "Expense updated successfully" : "Expense added successfully");
      onOpenChange(false);
      onSuccess();
      // Dispatch event to refresh all components
      window.dispatchEvent(new Event('transaction-added'));
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

    // Validate amount
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Amount must be greater than €0");
      return;
    }
    if (amount < 0.01) {
      toast.error("Amount must be at least €0.01");
      return;
    }
    if (amount > 1000000) {
      toast.error("Amount cannot exceed €1,000,000");
      return;
    }

    // Check if date is in the future
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
            <DialogTitle>{editTransaction ? "Edit expense" : "Add expense manually"}</DialogTitle>
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
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="e.g., Weekly groceries, Netflix subscription"
              />
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
            <AlertDialogCancel onClick={handleCancelFutureDate}>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={() => setShowFutureDateConfirm(false)}>
              Change Date
            </Button>
            <AlertDialogAction onClick={handleConfirmFutureDate}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
