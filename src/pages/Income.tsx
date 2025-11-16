import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { IncomeSummary } from "@/components/income/IncomeSummary";
import { IncomeSourceBreakdown } from "@/components/income/IncomeSourceBreakdown";
import { IncomeList } from "@/components/income/IncomeList";
import { ImportFromDrive } from "@/components/income/ImportFromDrive";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";

const Income = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header with Navigation */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-success/10 via-background to-transparent p-6 border border-success/20">
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Money In</h1>
                <p className="text-muted-foreground">Track your income sources and earnings</p>
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
                  <AppIcons.analytics.barChart className="mr-2 h-4 w-4" />
                  View Insights
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-success/5 rounded-full blur-3xl" />
        </div>

        <ImportFromDrive />
        
        <IncomeSummary />
        
        <IncomeSourceBreakdown />
        
        <IncomeList />
      </div>
    </DashboardLayout>
  );
};

export default Income;
