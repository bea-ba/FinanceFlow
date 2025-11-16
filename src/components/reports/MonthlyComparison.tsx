import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export const MonthlyComparison = () => {
  // Mockup data - comparing last 3 months
  const comparisonData = [
    {
      month: "November 2024",
      income: 8950.00,
      expenses: 5847.32,
      savings: 3102.68,
      savingsRate: 34.7,
      trend: "up"
    },
    {
      month: "October 2024",
      income: 9100.00,
      expenses: 5800.00,
      savings: 3300.00,
      savingsRate: 36.3,
      trend: "up"
    },
    {
      month: "September 2024",
      income: 8700.00,
      expenses: 6200.00,
      savings: 2500.00,
      savingsRate: 28.7,
      trend: "down"
    },
    {
      month: "August 2024",
      income: 8300.00,
      expenses: 5900.00,
      savings: 2400.00,
      savingsRate: 28.9,
      trend: "down"
    },
  ];

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
                    €{row.income.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    €{row.expenses.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    €{row.savings.toFixed(2)}
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
