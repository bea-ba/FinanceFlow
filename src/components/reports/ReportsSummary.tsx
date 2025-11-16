import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton-loaders";
import { AppIcons } from "@/config/icons";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

export const ReportsSummary = () => {
  const navigate = useNavigate();
  const {
    incomeMonthly,
    expenseMonthly,
    netSavingsMonthly,
    savingsRateMonthly,
    topExpenseCategoryMonthly,
    loading,
  } = useTransactions();

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <Card
        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl cursor-pointer"
        onClick={() => navigate("/income")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
            <AppIcons.financial.income className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            €{formatCurrency(incomeMonthly)}
          </div>
          <p className="text-xs text-muted-foreground">
            This month • Click to view
          </p>
        </CardContent>
      </Card>

      <Card
        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl cursor-pointer"
        onClick={() => navigate("/money-out")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
            <AppIcons.financial.expense className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            €{formatCurrency(expenseMonthly)}
          </div>
          <p className="text-xs text-muted-foreground">
            This month • Click to view
          </p>
        </CardContent>
      </Card>

      <Card className="group border-primary/30 bg-gradient-to-br from-primary/10 to-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <AppIcons.financial.euro className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">
            €{formatCurrency(netSavingsMonthly)}
          </div>
          <p className="text-xs text-muted-foreground">
            {(savingsRateMonthly || 0).toFixed(1)}% savings rate
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
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            {topExpenseCategoryMonthly?.category || 'None'}
          </div>
          <p className="text-xs text-muted-foreground">
            €{formatCurrency(topExpenseCategoryMonthly?.amount || 0)} spent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
