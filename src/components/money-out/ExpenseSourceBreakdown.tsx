import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart } from "lucide-react";

interface ExpenseSource {
  category: string;
  total: number;
  percentage: number;
}

export const ExpenseSourceBreakdown = () => {
  const [sources, setSources] = useState<ExpenseSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenseSources();
  }, []);

  const fetchExpenseSources = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('transactions')
      .select('category, amount')
      .eq('type', 'expense');

    if (data) {
      const categoryTotals = data.reduce((acc, t) => {
        const category = t.category;
        acc[category] = (acc[category] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

      const totalExpense = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

      const sourcesData = Object.entries(categoryTotals).map(([category, total]) => ({
        category: formatCategoryName(category),
        total,
        percentage: (total / totalExpense) * 100
      })).sort((a, b) => b.total - a.total);

      setSources(sourcesData);
    }
    setLoading(false);
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
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Where my money goes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded" />
            ))}
          </div>
        ) : sources.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No expenses yet — add some to see where my money goes</p>
        ) : (
          sources.map((source) => (
            <div key={source.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{source.category}</span>
                <span className="text-sm text-muted-foreground">
                  ${source.total.toFixed(2)} ({source.percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={source.percentage} className="h-2" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
