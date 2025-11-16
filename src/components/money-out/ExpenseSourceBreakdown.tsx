import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

export const ExpenseSourceBreakdown = () => {
  const { expenseBreakdown, loading } = useTransactions();

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
        ) : expenseBreakdown.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No expenses yet — add some to see where my money goes</p>
        ) : (
          expenseBreakdown.map((source) => (
            <div key={source.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{formatCategoryName(source.category)}</span>
                <span className="text-sm text-muted-foreground">
                  €{formatCurrency(source.total)} ({formatCurrency(source.percentage, 1)}%)
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
