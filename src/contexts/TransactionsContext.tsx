import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { parseLocalDate } from "@/lib/utils";

// Types
export interface Transaction {
  id: string;
  user_id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
  transaction_date: string;
  created_at?: string;
  updated_at?: string;
}

interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
  color?: string;
}

interface DailyTrend {
  day: string;
  income: number;
  expenses: number;
}

interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
}

interface TransactionsContextValue {
  // Raw data
  transactions: Transaction[];
  loading: boolean;

  // Calculated data - Dashboard
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];

  // Calculated data - Income
  incomeMonthly: number;
  incomeYearly: number;
  incomeBreakdown: CategoryBreakdown[];
  incomeTransactions: Transaction[];

  // Calculated data - Expenses
  expenseMonthly: number;
  expenseYearly: number;
  expenseBreakdown: CategoryBreakdown[];
  expenseTransactions: Transaction[];
  topExpenseCategories: CategoryBreakdown[];

  // Calculated data - Reports (Monthly specific)
  netSavingsMonthly: number;
  savingsRateMonthly: number;
  incomeBreakdownMonthly: CategoryBreakdown[];
  expenseBreakdownMonthly: CategoryBreakdown[];
  topExpenseCategoryMonthly: { category: string; amount: number } | null;
  dailyTrendsMonthly: DailyTrend[];
  monthlyTrends: MonthlyTrend[];

  // Methods
  refreshTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id" | "user_id" | "created_at" | "updated_at">) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Omit<Transaction, "id" | "user_id">>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return context;
};

interface TransactionsProviderProps {
  children: ReactNode;
}

/**
 * Rounds a number to 2 decimal places to avoid floating point precision errors
 * Example: roundCurrency(0.1 + 0.2) returns 0.3 instead of 0.30000000000000004
 */
const roundCurrency = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions
  const refreshTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false });

      if (error) throw error;

      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    refreshTransactions();
  }, []);

  // Realtime subscription for live updates
  useEffect(() => {
    let subscription: any;

    const setupRealtimeSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Subscribe to changes in transactions table for current user
      subscription = supabase
        .channel('transactions-changes')
        .on(
          'postgres_changes',
          {
            event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
            schema: 'public',
            table: 'transactions',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            // Refresh transactions when any change occurs
            refreshTransactions();
          }
        )
        .subscribe();
    };

    setupRealtimeSubscription();

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  // Calculated data using useMemo for performance
  const calculatedData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthStart = new Date(currentYear, currentMonth, 1);
    const yearStart = new Date(currentYear, 0, 1);

    // Filter by type
    const incomeTransactions = transactions.filter(t => t.type === "income");
    const expenseTransactions = transactions.filter(t => t.type === "expense");

    // Overall totals (with precision rounding)
    const totalIncome = roundCurrency(incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0));
    const totalExpenses = roundCurrency(expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0));
    const balance = roundCurrency(totalIncome - totalExpenses);

    // Monthly/Yearly income (with precision rounding and timezone-safe dates)
    const incomeMonthly = roundCurrency(incomeTransactions
      .filter(t => parseLocalDate(t.transaction_date) >= monthStart)
      .reduce((sum, t) => sum + Number(t.amount), 0));

    const incomeYearly = roundCurrency(incomeTransactions
      .filter(t => parseLocalDate(t.transaction_date) >= yearStart)
      .reduce((sum, t) => sum + Number(t.amount), 0));

    // Monthly/Yearly expenses (with precision rounding and timezone-safe dates)
    const expenseMonthly = roundCurrency(expenseTransactions
      .filter(t => parseLocalDate(t.transaction_date) >= monthStart)
      .reduce((sum, t) => sum + Number(t.amount), 0));

    const expenseYearly = roundCurrency(expenseTransactions
      .filter(t => parseLocalDate(t.transaction_date) >= yearStart)
      .reduce((sum, t) => sum + Number(t.amount), 0));

    // Income breakdown by category (with precision rounding)
    const incomeCategoryTotals = incomeTransactions.reduce((acc, t) => {
      acc[t.category] = roundCurrency((acc[t.category] || 0) + Number(t.amount));
      return acc;
    }, {} as Record<string, number>);

    const incomeBreakdown: CategoryBreakdown[] = Object.entries(incomeCategoryTotals)
      .map(([category, total]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " "),
        total: roundCurrency(total),
        percentage: roundCurrency(totalIncome > 0 ? (total / totalIncome) * 100 : 0),
      }))
      .sort((a, b) => b.total - a.total);

    // Expense breakdown by category (with precision rounding)
    const expenseCategoryTotals = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = roundCurrency((acc[t.category] || 0) + Number(t.amount));
      return acc;
    }, {} as Record<string, number>);

    const categoryColors: Record<string, string> = {
      groceries: "hsl(var(--info))",
      dining: "hsl(24 100% 62%)",
      transport: "hsl(271 76% 53%)",
      utilities: "hsl(48 96% 53%)",
      entertainment: "hsl(239 84% 67%)",
      shopping: "hsl(330 81% 60%)",
      health: "hsl(0 84% 60%)",
      education: "hsl(173 80% 40%)",
      other_expense: "hsl(215 14% 56%)",
    };

    const expenseBreakdown: CategoryBreakdown[] = Object.entries(expenseCategoryTotals)
      .map(([category, total]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " "),
        total: roundCurrency(total),
        percentage: roundCurrency(totalExpenses > 0 ? (total / totalExpenses) * 100 : 0),
        color: categoryColors[category],
      }))
      .sort((a, b) => b.total - a.total);

    // Top 5 expense categories for charts
    const topExpenseCategories = expenseBreakdown.slice(0, 5);

    // Recent 10 transactions
    const recentTransactions = transactions.slice(0, 10);

    // Reports-specific calculations (Monthly) (with precision rounding)
    const netSavingsMonthly = roundCurrency(incomeMonthly - expenseMonthly);
    const savingsRateMonthly = roundCurrency(incomeMonthly > 0 ? (netSavingsMonthly / incomeMonthly) * 100 : 0);

    // Monthly income breakdown (with precision rounding and timezone-safe dates)
    const monthlyIncomeTransactions = incomeTransactions.filter(
      t => parseLocalDate(t.transaction_date) >= monthStart
    );
    const monthlyIncomeCategoryTotals = monthlyIncomeTransactions.reduce((acc, t) => {
      acc[t.category] = roundCurrency((acc[t.category] || 0) + Number(t.amount));
      return acc;
    }, {} as Record<string, number>);

    const incomeBreakdownMonthly: CategoryBreakdown[] = Object.entries(monthlyIncomeCategoryTotals)
      .map(([category, total]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " "),
        total: roundCurrency(total),
        percentage: roundCurrency(incomeMonthly > 0 ? (total / incomeMonthly) * 100 : 0),
      }))
      .sort((a, b) => b.total - a.total);

    // Monthly expense breakdown (with precision rounding and timezone-safe dates)
    const monthlyExpenseTransactions = expenseTransactions.filter(
      t => parseLocalDate(t.transaction_date) >= monthStart
    );
    const monthlyExpenseCategoryTotals = monthlyExpenseTransactions.reduce((acc, t) => {
      acc[t.category] = roundCurrency((acc[t.category] || 0) + Number(t.amount));
      return acc;
    }, {} as Record<string, number>);

    const expenseBreakdownMonthly: CategoryBreakdown[] = Object.entries(monthlyExpenseCategoryTotals)
      .map(([category, total]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " "),
        total: roundCurrency(total),
        percentage: roundCurrency(expenseMonthly > 0 ? (total / expenseMonthly) * 100 : 0),
        color: categoryColors[category],
      }))
      .sort((a, b) => b.total - a.total);

    // Top expense category for current month
    const topExpenseCategoryMonthly = expenseBreakdownMonthly.length > 0
      ? { category: expenseBreakdownMonthly[0].category, amount: expenseBreakdownMonthly[0].total }
      : null;

    // Daily trends for current month (with precision rounding and timezone-safe dates)
    const dailyIncome: Record<string, number> = {};
    const dailyExpenses: Record<string, number> = {};

    monthlyIncomeTransactions.forEach(t => {
      const day = parseLocalDate(t.transaction_date).getDate().toString();
      dailyIncome[day] = roundCurrency((dailyIncome[day] || 0) + Number(t.amount));
    });

    monthlyExpenseTransactions.forEach(t => {
      const day = parseLocalDate(t.transaction_date).getDate().toString();
      dailyExpenses[day] = roundCurrency((dailyExpenses[day] || 0) + Number(t.amount));
    });

    const allDays = new Set([...Object.keys(dailyIncome), ...Object.keys(dailyExpenses)]);
    const dailyTrendsMonthly: DailyTrend[] = Array.from(allDays)
      .map(day => ({
        day,
        income: roundCurrency(dailyIncome[day] || 0),
        expenses: roundCurrency(dailyExpenses[day] || 0),
      }))
      .sort((a, b) => parseInt(a.day) - parseInt(b.day));

    // Monthly trends for last 6 months (with precision rounding and timezone-safe dates)
    const monthlyTrends: MonthlyTrend[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(currentYear, currentMonth - i, 1);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'short' });
      const monthStartDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
      const monthEndDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

      const monthIncome = roundCurrency(incomeTransactions
        .filter(t => {
          const tDate = parseLocalDate(t.transaction_date);
          return tDate >= monthStartDate && tDate <= monthEndDate;
        })
        .reduce((sum, t) => sum + Number(t.amount), 0));

      const monthExpenses = roundCurrency(expenseTransactions
        .filter(t => {
          const tDate = parseLocalDate(t.transaction_date);
          return tDate >= monthStartDate && tDate <= monthEndDate;
        })
        .reduce((sum, t) => sum + Number(t.amount), 0));

      monthlyTrends.push({
        month: monthName,
        income: monthIncome,
        expenses: monthExpenses,
      });
    }

    return {
      totalIncome,
      totalExpenses,
      balance,
      incomeMonthly,
      incomeYearly,
      expenseMonthly,
      expenseYearly,
      incomeBreakdown,
      expenseBreakdown,
      topExpenseCategories,
      recentTransactions,
      incomeTransactions,
      expenseTransactions,
      // Reports-specific
      netSavingsMonthly,
      savingsRateMonthly,
      incomeBreakdownMonthly,
      expenseBreakdownMonthly,
      topExpenseCategoryMonthly,
      dailyTrendsMonthly,
      monthlyTrends,
    };
  }, [transactions]);

  // Add transaction (Optimistic UI with Balance Change)
  const addTransaction = async (transaction: Omit<Transaction, "id" | "user_id" | "created_at" | "updated_at">) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in");
      return;
    }

    const oldBalance = calculatedData.balance;

    // Optimistic update: create temporary transaction
    const tempId = `temp-${Date.now()}`;
    const optimisticTransaction: Transaction = {
      id: tempId,
      user_id: user.id,
      ...transaction,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Immediately update UI
    setTransactions(prev => [optimisticTransaction, ...prev]);

    // Calculate balance change (with precision rounding)
    const balanceChange = roundCurrency(transaction.type === "income" ? transaction.amount : -transaction.amount);
    const newBalance = roundCurrency(oldBalance + balanceChange);

    try {
      const { error } = await supabase.from("transactions").insert([{
        user_id: user.id,
        ...transaction,
      }]);

      if (error) throw error;

      toast.success(`${transaction.type === "income" ? "Income" : "Expense"} added`, {
        description: `Balance: €${newBalance.toFixed(2)} (${balanceChange > 0 ? '+' : ''}€${balanceChange.toFixed(2)})`,
      });

      // Refresh to get real ID and server data
      await refreshTransactions();
    } catch (error) {
      // Rollback optimistic update
      setTransactions(prev => prev.filter(t => t.id !== tempId));
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
      throw error;
    }
  };

  // Update transaction (Optimistic UI with Balance Change)
  const updateTransaction = async (id: string, transaction: Partial<Omit<Transaction, "id" | "user_id">>) => {
    // Store original for rollback
    const originalTransaction = transactions.find(t => t.id === id);
    if (!originalTransaction) return;

    const oldBalance = calculatedData.balance;

    // Calculate balance change from the update (with precision rounding)
    const oldAmount = originalTransaction.amount;
    const newAmount = transaction.amount ?? originalTransaction.amount;
    const transactionType = transaction.type ?? originalTransaction.type;

    const oldEffect = roundCurrency(originalTransaction.type === "income" ? oldAmount : -oldAmount);
    const newEffect = roundCurrency(transactionType === "income" ? newAmount : -newAmount);
    const balanceChange = roundCurrency(newEffect - oldEffect);
    const newBalance = roundCurrency(oldBalance + balanceChange);

    // Optimistic update: immediately update in state
    setTransactions(prev => prev.map(t =>
      t.id === id ? { ...t, ...transaction, updated_at: new Date().toISOString() } : t
    ));

    try {
      const { error } = await supabase
        .from("transactions")
        .update(transaction)
        .eq("id", id);

      if (error) throw error;

      toast.success(`${transactionType === "income" ? "Income" : "Expense"} updated`, {
        description: balanceChange !== 0
          ? `Balance: €${newBalance.toFixed(2)} (${balanceChange > 0 ? '+' : ''}€${balanceChange.toFixed(2)})`
          : `No balance change`,
      });

      await refreshTransactions();
    } catch (error) {
      // Rollback optimistic update
      setTransactions(prev => prev.map(t =>
        t.id === id ? originalTransaction : t
      ));
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction");
      throw error;
    }
  };

  // Delete transaction (Optimistic UI with Undo)
  const deleteTransaction = async (id: string) => {
    // Store deleted transaction for rollback and undo
    const deletedTransaction = transactions.find(t => t.id === id);
    if (!deletedTransaction) return;

    const oldBalance = calculatedData.balance;

    // Optimistic update: immediately remove from state
    setTransactions(prev => prev.filter(t => t.id !== id));

    // Calculate balance change (with precision rounding)
    const balanceChange = roundCurrency(deletedTransaction.type === "income" ? -deletedTransaction.amount : deletedTransaction.amount);
    let undoClicked = false;
    let deleteExecuted = false;

    // Show toast with undo option
    toast.success(
      `${deletedTransaction.type === "income" ? "Income" : "Expense"} deleted`,
      {
        description: `Balance: €${((oldBalance + balanceChange)).toFixed(2)} (${balanceChange > 0 ? '+' : ''}€${balanceChange.toFixed(2)})`,
        action: {
          label: "Undo",
          onClick: () => {
            undoClicked = true;
            if (!deleteExecuted) {
              // Restore before delete was executed (with timezone-safe dates)
              setTransactions(prev => [...prev, deletedTransaction].sort(
                (a, b) => parseLocalDate(b.transaction_date).getTime() - parseLocalDate(a.transaction_date).getTime()
              ));
              toast.info("Delete cancelled");
            } else {
              // Need to re-insert to database
              supabase.from("transactions").insert({
                ...deletedTransaction,
                id: undefined // Let database generate new ID
              }).then(() => {
                refreshTransactions();
                toast.info("Transaction restored");
              });
            }
          },
        },
        duration: 5000, // 5 seconds to undo
      }
    );

    // Wait a bit before actually deleting from database (gives time for undo)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (undoClicked) return; // User clicked undo, don't delete

    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      deleteExecuted = true;

      if (error) throw error;

      await refreshTransactions();
    } catch (error) {
      // Rollback optimistic update (with timezone-safe dates)
      setTransactions(prev => [...prev, deletedTransaction].sort(
        (a, b) => parseLocalDate(b.transaction_date).getTime() - parseLocalDate(a.transaction_date).getTime()
      ));
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
      throw error;
    }
  };

  const value: TransactionsContextValue = {
    transactions,
    loading,
    ...calculatedData,
    refreshTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};
