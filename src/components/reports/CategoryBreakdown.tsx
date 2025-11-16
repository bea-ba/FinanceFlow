import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

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
  const { incomeBreakdownMonthly, expenseBreakdownMonthly, loading } = useTransactions();

  if (loading) {
    return <ChartSkeleton />;
  }

  // Transform context data to chart format
  const incomeData: CategoryData[] = incomeBreakdownMonthly.map((item, index) => ({
    name: item.category,
    value: item.total,
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
  }));

  const expenseData: CategoryData[] = expenseBreakdownMonthly.map((item, index) => ({
    name: item.category,
    value: item.total,
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
  }));

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

  // Custom tooltip for donut chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-border rounded-xl p-3 shadow-elevated">
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-primary font-bold">€{formatCurrency(data.value)}</p>
          <p className="text-muted-foreground text-xs">{data.payload.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCategorySection = (data: CategoryData[], title: string, emptyMessage: string) => {
    if (data.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Add percentage to data
    const chartData = data.map(item => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(1)
    }));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {title}
          </h3>
          <span className="text-lg font-bold text-primary">
            €{formatCurrency(total)}
          </span>
        </div>

        {/* Donut Chart */}
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm">
                  {value} ({entry.payload.percentage}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
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
