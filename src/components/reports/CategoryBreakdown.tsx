import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

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
