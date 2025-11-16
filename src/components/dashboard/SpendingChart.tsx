import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

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
  const navigate = useNavigate();
  const { topExpenseCategories, loading } = useTransactions();

  // Map categories to include color for display
  const spending = topExpenseCategories.map(item => ({
    ...item,
    color: categoryColors[item.category] || categoryColors.other_expense,
  }));

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
          Add some expenses to see my spending breakdown
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Where my money goes</h3>
        <button
          onClick={() => navigate("/money-out")}
          className="text-sm text-primary font-medium hover:underline cursor-pointer transition-colors"
        >
          See all →
        </button>
      </div>

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
                €{formatCurrency(item.amount)}
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
              {formatCurrency(item.percentage, 1)}% of my spending
            </p>
          </div>
        ))}
      </div>

      <Button
        onClick={() => navigate("/money-out")}
        variant="outline"
        className="w-full mt-6 rounded-xl"
      >
        <AppIcons.financial.expense className="mr-2 h-4 w-4" />
        View All Expenses
      </Button>
    </Card>
  );
};
