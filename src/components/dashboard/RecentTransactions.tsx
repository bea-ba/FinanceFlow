import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Zap, 
  Film, 
  Heart, 
  GraduationCap,
  Briefcase,
  Gift,
  MoreHorizontal,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
  transaction_date: string;
}

const categoryIcons: Record<string, any> = {
  salary: Briefcase,
  freelance: TrendingUp,
  gift: Gift,
  other_income: MoreHorizontal,
  groceries: ShoppingBag,
  dining: Utensils,
  transport: Car,
  utilities: Zap,
  entertainment: Film,
  shopping: ShoppingBag,
  health: Heart,
  education: GraduationCap,
  other_expense: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  salary: "bg-primary/10 text-primary",
  freelance: "bg-success/10 text-success",
  gift: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  groceries: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  dining: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  transport: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  utilities: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  entertainment: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  shopping: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  health: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  education: "bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  other_income: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  other_expense: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
};

export const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false })
        .limit(10);

      if (data) {
        setTransactions(data);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-3">
              <div className="h-12 w-12 bg-muted rounded-xl" />
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
              <div className="h-4 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingDown className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
        <p className="text-sm text-muted-foreground">
          Start tracking your finances by adding your first transaction
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => {
          const Icon = categoryIcons[transaction.category] || MoreHorizontal;
          const colorClass = categoryColors[transaction.category] || "bg-slate-100 text-slate-600";
          const isIncome = transaction.type === "income";

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={cn("p-3 rounded-xl", colorClass)}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground capitalize truncate">
                  {transaction.description || transaction.category.replace(/_/g, " ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.transaction_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              
              <p className={cn(
                "font-semibold text-base whitespace-nowrap",
                isIncome ? "text-success" : "text-destructive"
              )}>
                {isIncome ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
