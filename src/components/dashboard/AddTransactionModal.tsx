import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category is required"),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().optional(),
  transaction_date: z.string().min(1, "Date is required"),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const incomeCategories = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "gift", label: "Gift" },
  { value: "other_income", label: "Other Income" },
];

const expenseCategories = [
  { value: "groceries", label: "Groceries" },
  { value: "dining", label: "Dining Out" },
  { value: "transport", label: "Transport" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "other_expense", label: "Other" },
];

export const AddTransactionModal = ({ open, onOpenChange, onSuccess }: AddTransactionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");
  const [showFutureDateConfirm, setShowFutureDateConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<TransactionFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      transaction_date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedCategory = watch("category");

  const saveTransaction = async (data: TransactionFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("transactions").insert([{
        user_id: user.id,
        type: data.type,
        category: data.category as any,
        amount: parseFloat(data.amount),
        description: data.description || null,
        transaction_date: data.transaction_date,
      }]);

      if (error) throw error;

      toast.success(`${data.type === "income" ? "Money In" : "Money Out"} added!`);
      reset();
      onOpenChange(false);

      // Call success callback to refresh data without full page reload
      if (onSuccess) {
        onSuccess();
      }

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('transaction-added'));
    } catch (error: any) {
      toast.error(error.message || "Failed to add transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: TransactionFormData) => {
    // Check if date is in the future
    const selectedDate = new Date(data.transaction_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setPendingData(data);
      setShowFutureDateConfirm(true);
      return;
    }

    await saveTransaction(data);
  };

  const handleConfirmFutureDate = async () => {
    setShowFutureDateConfirm(false);
    if (pendingData) {
      await saveTransaction(pendingData);
      setPendingData(null);
    }
  };

  const handleCancelFutureDate = () => {
    setShowFutureDateConfirm(false);
    setPendingData(null);
  };

  const handleTabChange = (value: string) => {
    setTransactionType(value as "income" | "expense");
    setValue("type", value as "income" | "expense");
    setValue("category", "");
  };

  const categories = transactionType === "income" ? incomeCategories : expenseCategories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Quick add
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Tabs value={transactionType} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense" className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive">
                <span className="flex items-center gap-1.5">
                  Money Out
                </span>
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-success/10 data-[state=active]:text-success">
                <span className="flex items-center gap-1.5">
                  Money In
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground">
                €
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-8 text-2xl h-14 font-semibold"
                {...register("amount")}
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pick a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction_date">Date</Label>
              <Input
                id="transaction_date"
                type="date"
                {...register("transaction_date")}
              />
              {errors.transaction_date && (
                <p className="text-sm text-destructive">{errors.transaction_date.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Note (optional)</Label>
            <Input
              id="description"
              placeholder="Add a note..."
              {...register("description")}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-slate-900 font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : (
              "Add it"
            )}
          </Button>
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
            <Button variant="outline" onClick={() => {
              setShowFutureDateConfirm(false);
              setPendingData(null);
            }}>
              Change Date
            </Button>
            <AlertDialogAction onClick={handleConfirmFutureDate}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};
