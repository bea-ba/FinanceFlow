import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/skeleton-loaders";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MonthData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
  trend: string;
}

export const MonthlyComparison = () => {
  const [comparisonData, setComparisonData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get data for the last 4 months
      const monthsData: MonthData[] = [];
      const now = new Date();

      for (let i = 0; i < 4; i++) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const startOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1).toISOString().split('T')[0];
        const endOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).toISOString().split('T')[0];

        const { data: transactions } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .gte('transaction_date', startOfMonth)
          .lte('transaction_date', endOfMonth);

        if (transactions) {
          const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0);

          const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0);

          const savings = income - expenses;
          const savingsRate = income > 0 ? (savings / income) * 100 : 0;

          // Determine trend (compare with previous month if available)
          const trend = i === 0 || monthsData.length === 0
            ? "up"
            : savingsRate > monthsData[monthsData.length - 1].savingsRate
            ? "up"
            : "down";

          monthsData.push({
            month: monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
            income,
            expenses,
            savings,
            savingsRate: parseFloat(savingsRate.toFixed(1)),
            trend
          });
        }
      }

      setComparisonData(monthsData);
    } catch (error) {
      console.error("Error fetching monthly comparison data:", error);
    } finally {
      setLoading(false);
    }
  };

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
