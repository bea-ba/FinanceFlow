import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const categoryLabels: Record<string, string> = {
  groceries: "Groceries",
  dining: "Dining Out",
  transport: "Transport",
  utilities: "Utilities",
  entertainment: "Entertainment",
  shopping: "Shopping",
  health: "Health",
  education: "Education",
  other_expense: "Other",
};

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

export const SpendingChart = () => {
  const [spending, setSpending] = useState<CategorySpending[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpending = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: transactions } = await supabase
        .from("transactions")
        .select("category, amount")
        .eq("user_id", user.id)
        .eq("type", "expense");

      if (transactions && transactions.length > 0) {
        const categoryTotals: Record<string, number> = {};
        let total = 0;

        transactions.forEach((t) => {
          const amount = Number(t.amount);
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
          total += amount;
        });

        const categorySpending: CategorySpending[] = Object.entries(categoryTotals)
          .map(([category, amount]) => ({
            category,
            amount,
            percentage: (amount / total) * 100,
            color: categoryColors[category] || categoryColors.other_expense,
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5);

        setSpending(categorySpending);
      }
      setLoading(false);
    };

    fetchSpending();
  }, []);

  if (loading) {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3 mb-2" />
              <div className="h-2 bg-muted rounded" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (spending.length === 0) {
    return (
      <Card className="p-8 text-center border-border">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No spending data</h3>
        <p className="text-sm text-muted-foreground">
          Add some expenses to see your spending breakdown
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">Where your money goes</h3>
      
      <div className="space-y-5">
        {spending.map((item, index) => (
          <div 
            key={item.category}
            className="group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium text-foreground capitalize">
                {categoryLabels[item.category] || item.category.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-semibold text-foreground">
                ${item.amount.toFixed(2)}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={item.percentage} 
                className="h-2.5"
                style={{
                  // @ts-ignore
                  "--progress-background": item.color
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {item.percentage.toFixed(1)}% of your spending
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
