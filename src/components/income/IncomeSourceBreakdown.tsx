import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

export const IncomeSourceBreakdown = () => {
  const { incomeBreakdown, loading } = useTransactions();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Salary: "bg-primary",
      Freelance: "bg-secondary",
      Business: "bg-accent",
      Other: "bg-muted-foreground"
    };
    return colors[category] || "bg-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Where my money comes from
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded" />
            ))}
          </div>
        ) : incomeBreakdown.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No income yet — add some to see my breakdown</p>
        ) : (
          incomeBreakdown.map((source) => (
            <div key={source.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{source.category}</span>
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
