import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { Target, ChevronDown, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [incomeDetailsOpen, setIncomeDetailsOpen] = useState(false);
  const [expenseDetailsOpen, setExpenseDetailsOpen] = useState(false);

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
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <Target className="h-12 w-12 text-muted-foreground mb-2" />
          <div>
            <p className="text-muted-foreground font-medium">No transaction data available for this month</p>
            <p className="text-sm text-muted-foreground">Start tracking to see your breakdown</p>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={() => navigate("/income")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Income
            </Button>
            <Button onClick={() => navigate("/money-out")} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </div>
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

  const renderCategorySection = (
    data: CategoryData[],
    title: string,
    emptyMessage: string,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
  ) => {
    if (data.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);

    // Add percentage to data and sort by value descending for bar chart
    const chartData = data
      .map(item => {
        const value = item.value || 0;
        const percentage = total > 0 ? (value / total) * 100 : 0;
        return {
          ...item,
          percentage: percentage.toFixed(1)
        };
      })
      .sort((a, b) => (b.value || 0) - (a.value || 0)); // Sort for better bar chart readability

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

        {/* Chart Visualization */}
        <ResponsiveContainer width="100%" height={280} className="min-h-[220px] h-[35vh] max-h-[320px]">
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
          </PieChart>
        </ResponsiveContainer>

        {/* Collapsible Detailed List */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full justify-center py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <span>{isOpen ? "Hide" : "Show"} detailed breakdown</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-2">
              {chartData.map((category, index) => (
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
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
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
          {renderCategorySection(
            incomeData,
            "Income by Source",
            "No income data for this month",
            incomeDetailsOpen,
            setIncomeDetailsOpen
          )}
        </div>

        {/* Expense Section */}
        <div>
          {renderCategorySection(
            expenseData,
            "Expenses by Category",
            "No expense data for this month",
            expenseDetailsOpen,
            setExpenseDetailsOpen
          )}
        </div>
      </CardContent>
    </Card>
  );
};
