import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/skeleton-loaders";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

interface MonthData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
  trend: string;
}

export const MonthlyComparison = () => {
  // Use centralized context instead of local queries
  const { monthlyTrends, loading } = useTransactions();

  // Transform context data to add savings, savingsRate, and trend
  const comparisonData = useMemo<MonthData[]>(() => {
    if (!monthlyTrends || monthlyTrends.length === 0) return [];

    // Take last 4 months from the 6-month trends
    const lastFourMonths = monthlyTrends.slice(-4);

    // Calculate derived data and add full month names
    return lastFourMonths.map((trend, index) => {
      const savings = trend.income - trend.expenses;
      const savingsRate = trend.income > 0 ? (savings / trend.income) * 100 : 0;

      // Determine trend (compare with previous month if available)
      const prevSavingsRate = index > 0
        ? ((lastFourMonths[index - 1].income - lastFourMonths[index - 1].expenses) / lastFourMonths[index - 1].income) * 100
        : 0;

      const trendDirection = index === 0 ? "up" : savingsRate >= prevSavingsRate ? "up" : "down";

      // Convert short month name to full format with year
      const now = new Date();
      const monthsBack = lastFourMonths.length - 1 - index;
      const monthDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);
      const fullMonth = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

      return {
        month: fullMonth,
        income: trend.income,
        expenses: trend.expenses,
        savings,
        savingsRate: parseFloat(savingsRate.toFixed(1)),
        trend: trendDirection,
      };
    });
  }, [monthlyTrends]);

  if (loading) {
    return (
      <Card className="shadow-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Monthly Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton rows={4} />
        </CardContent>
      </Card>
    );
  }

  if (comparisonData.length === 0) {
    return (
      <Card className="shadow-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Monthly Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">No transaction data available for comparison</p>
        </CardContent>
      </Card>
    );
  }

  const getTrendBadge = (trend: string, savingsRate: number) => {
    if (trend === "up" && savingsRate > 30) {
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    } else if (savingsRate > 20) {
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    } else {
      return <Badge className="bg-orange-100 text-orange-800">Fair</Badge>;
    }
  };

  return (
    <Card className="shadow-card rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Monthly Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Income</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Savings</TableHead>
                <TableHead className="text-right">Savings Rate</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right text-green-600">
                    €{formatCurrency(row.income)}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    €{formatCurrency(row.expenses)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    €{formatCurrency(row.savings)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {row.savingsRate}%
                  </TableCell>
                  <TableCell>
                    {getTrendBadge(row.trend, row.savingsRate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
