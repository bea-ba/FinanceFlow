import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const CATEGORY_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(142 76% 36%)",
  "hsl(197 37% 45%)",
  "hsl(43 96% 56%)",
  "hsl(291 47% 51%)",
  "hsl(16 100% 66%)",
];

export const CategoryBreakdown = () => {
  const [incomeData, setIncomeData] = useState<CategoryData[]>([]);
  const [expenseData, setExpenseData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current month transactions
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('transaction_date', startOfMonth)
        .lte('transaction_date', endOfMonth);

      if (!transactions || transactions.length === 0) {
        setIncomeData([]);
        setExpenseData([]);
        setLoading(false);
        return;
      }

      // Format category names
      const formatCategory = (cat: string) => {
        return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      // Aggregate income by category
      const incomeTotals: Record<string, number> = {};
      transactions
        .filter(t => t.type === 'income')
        .forEach(t => {
          incomeTotals[t.category] = (incomeTotals[t.category] || 0) + Number(t.amount);
        });

      const incomeChartData: CategoryData[] = Object.entries(incomeTotals)
        .map(([category, value], index) => ({
          name: formatCategory(category),
          value,
          color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
        }))
        .sort((a, b) => b.value - a.value);

      // Aggregate expenses by category
      const expenseTotals: Record<string, number> = {};
      transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          expenseTotals[t.category] = (expenseTotals[t.category] || 0) + Number(t.amount);
        });

      const expenseChartData: CategoryData[] = Object.entries(expenseTotals)
        .map(([category, value], index) => ({
          name: formatCategory(category),
          value,
          color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
        }))
        .sort((a, b) => b.value - a.value);

      setIncomeData(incomeChartData);
      setExpenseData(expenseChartData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ChartSkeleton />;
  }

  if (incomeData.length === 0 && expenseData.length === 0) {
    return (
      <Card className="shadow-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">No transaction data available for this month</p>
        </CardContent>
      </Card>
    );
  }

  const renderCategorySection = (data: CategoryData[], title: string, emptyMessage: string) => {
    if (data.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          {title}
          <span className="text-xs text-muted-foreground font-normal">
            (€{formatCurrency(total)})
          </span>
        </h3>

        {/* Category List */}
        <div className="space-y-2">
          {data.map((category, index) => {
            const percentage = ((category.value / total) * 100).toFixed(1);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">
                    €{formatCurrency(category.value)}
                  </span>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-card rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Category Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Income Section */}
        <div className="pb-6 border-b border-border">
          {renderCategorySection(incomeData, "Income by Source", "No income data for this month")}
        </div>

        {/* Expense Section */}
        <div>
          {renderCategorySection(expenseData, "Expenses by Category", "No expense data for this month")}
        </div>
      </CardContent>
    </Card>
  );
};
