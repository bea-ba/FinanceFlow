import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MoneyOutSummary } from "@/components/money-out/MoneyOutSummary";
import { ImportMoneyOut } from "@/components/money-out/ImportMoneyOut";
import { ExpenseSourceBreakdown } from "@/components/money-out/ExpenseSourceBreakdown";
import { MoneyOutList } from "@/components/money-out/MoneyOutList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";

const MoneyOut = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header with Navigation */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-destructive/10 via-background to-transparent p-6 border border-destructive/20">
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Money Out</h1>
                <p className="text-muted-foreground">Track and analyze your spending</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="rounded-xl"
                >
                  <AppIcons.navigation.home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/reports")}
                  className="rounded-xl"
                >
                  <AppIcons.navigation.insights className="mr-2 h-4 w-4" />
                  View Insights
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-destructive/5 rounded-full blur-3xl" />
        </div>

        <ImportMoneyOut />
        
        <MoneyOutSummary />
        
        <ExpenseSourceBreakdown />
        
        <MoneyOutList />
      </div>
      <QuickActions />
    </DashboardLayout>
  );
};

export default MoneyOut;
