import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BillsSummary } from "@/components/bills/BillsSummary";
import { UpcomingBills } from "@/components/bills/UpcomingBills";
import { BillsList } from "@/components/bills/BillsList";
import { RecurringBillsChart } from "@/components/bills/RecurringBillsChart";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";

const Bills = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header with Navigation */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-warning/10 via-background to-transparent p-6 border border-warning/20">
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Bills Tracking</h1>
                <p className="text-muted-foreground">Manage recurring bills and never miss a payment</p>
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
                  onClick={() => navigate("/money-out")}
                  className="rounded-xl"
                >
                  <AppIcons.financial.expense className="mr-2 h-4 w-4" />
                  View Expenses
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-warning/5 rounded-full blur-3xl" />
        </div>

        <BillsSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingBills />
          <RecurringBillsChart />
        </div>

        <BillsList />
      </div>
    </DashboardLayout>
  );
};

export default Bills;
