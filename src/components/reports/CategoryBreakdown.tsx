import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Target } from "lucide-react";

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
  const [data, setData] = useState<CategoryData[]>([]);
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
        .eq('type', 'expense')
        .gte('transaction_date', startOfMonth)
        .lte('transaction_date', endOfMonth);

      if (!transactions || transactions.length === 0) {
        setData([]);
        setLoading(false);
        return;
      }

      // Aggregate by category
      const categoryTotals: Record<string, number> = {};
      transactions.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
      });

      // Format category names
      const formatCategory = (cat: string) => {
        return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      // Convert to chart data format
      const chartData: CategoryData[] = Object.entries(categoryTotals)
        .map(([category, value], index) => ({
          name: formatCategory(category),
          value,
          color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
        }))
        .sort((a, b) => b.value - a.value); // Sort by amount descending

      setData(chartData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ChartSkeleton />;
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Expense Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">No expense data available for this month</p>
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="shadow-card rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Expense Category Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pie Chart */}
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => [
                  `$€{value.toFixed(2)} (€{((value / total) * 100).toFixed(1)}%)`,
                  'Amount'
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total in Center */}
        <div className="text-center -mt-44 mb-32 pointer-events-none">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">€{total.toFixed(2)}</p>
        </div>

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
                    €{category.value.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
