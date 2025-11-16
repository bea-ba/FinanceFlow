import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

export const ReportsSummary = () => {
  // Mockup data for current period
  const totalIncome = 8950.00;
  const totalExpenses = 5847.32;
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = ((netSavings / totalIncome) * 100).toFixed(1);
  const expenseGrowth = -8.5; // negative means reduction

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${totalIncome.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            This period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            ${totalExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-green-600">
            {expenseGrowth}% vs last period
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            ${netSavings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {savingsRate}% savings rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Groceries</div>
          <p className="text-xs text-muted-foreground">
            $1,248.50 spent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
