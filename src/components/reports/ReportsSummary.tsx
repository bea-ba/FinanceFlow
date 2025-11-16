import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";

export const ReportsSummary = () => {
  // Mockup data for current period
  const totalIncome = 8950.00;
  const totalExpenses = 5847.32;
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = ((netSavings / totalIncome) * 100).toFixed(1);
  const expenseGrowth = -8.5; // negative means reduction

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
            <AppIcons.financial.income className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            ${totalIncome.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            This period
          </p>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
            <AppIcons.financial.expense className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            ${totalExpenses.toFixed(2)}
          </div>
          <p className="text-xs text-success flex items-center gap-1">
            {expenseGrowth}% vs last period
          </p>
        </CardContent>
      </Card>

      <Card className="group border-primary/30 bg-gradient-to-br from-primary/10 to-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <AppIcons.financial.money className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">
            ${netSavings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {savingsRate}% savings rate
          </p>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Top Category</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors">
            <AppIcons.analytics.pieChart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">Groceries</div>
          <p className="text-xs text-muted-foreground">
            $1,248.50 spent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
