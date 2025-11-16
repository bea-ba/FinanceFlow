import { useState, useEffect } from "react";
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

interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  transaction_date: string;
}

interface AddIncomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editTransaction?: Transaction | null;
}

export const AddIncomeModal = ({ open, onOpenChange, onSuccess, editTransaction }: AddIncomeModalProps) => {
  const { addTransaction, updateTransaction } = useTransactions();
  const [loading, setLoading] = useState(false);
  const [showFutureDateConfirm, setShowFutureDateConfirm] = useState(false);
  const [showLargeAmountConfirm, setShowLargeAmountConfirm] = useState(false);
  const [formData, setFormData] = useState({
    category: "salary",
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
        category: "salary",
        amount: "",
        description: "",
        transaction_date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editTransaction, open]);

  const saveIncome = async () => {
    setLoading(true);

    try {
      const transactionData = {
        type: 'income' as const,
        category: formData.category as "salary" | "freelance" | "gift" | "other_income",
        amount: parseFloat(formData.amount),
        description: formData.description,
        transaction_date: formData.transaction_date
      };

      if (editTransaction) {
        // Update existing transaction
        await updateTransaction(editTransaction.id, transactionData);
      } else {
        // Insert new transaction
        await addTransaction(transactionData);
      }

      toast.success(editTransaction ? "Income updated successfully" : "Income added successfully");
      onOpenChange(false);
      onSuccess();
      setFormData({
        category: "salary",
        amount: "",
        description: "",
        transaction_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error saving income:', error);
      toast.error(editTransaction ? "Failed to update income" : "Failed to add income");
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

    // Check for unusually large amounts
    if (amount > 10000 && !editTransaction) {
      setShowLargeAmountConfirm(true);
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

    await saveIncome();
  };

  const handleConfirmFutureDate = async () => {
    setShowFutureDateConfirm(false);
    await saveIncome();
  };

  const handleCancelFutureDate = () => {
    setShowFutureDateConfirm(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editTransaction ? "Edit income" : "Add income manually"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Where from?</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="other_income">Other Income</SelectItem>
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
            {parseFloat(formData.amount) > 10000 && (
              <p className="text-xs text-amber-600">Large amount - you'll be asked to confirm</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g., Freelance project payment, Monthly salary"
            />
            {parseFloat(formData.amount) > 1000 && !formData.description && formData.category !== 'salary' && (
              <p className="text-xs text-amber-600">💡 Tip: Adding a description helps track large amounts</p>
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (editTransaction ? "Saving..." : "Adding...") : (editTransaction ? "Save changes" : "Add income")}
            </Button>
          </div>
        </form>
      </DialogContent>

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

      <AlertDialog open={showLargeAmountConfirm} onOpenChange={setShowLargeAmountConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Large Amount Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You're adding €{parseFloat(formData.amount).toLocaleString()} as income. Please confirm this is correct.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLargeAmountConfirm(false)}>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={() => setShowLargeAmountConfirm(false)}>
              Edit Amount
            </Button>
            <AlertDialogAction onClick={async () => {
              setShowLargeAmountConfirm(false);
              await saveIncome();
            }}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};
