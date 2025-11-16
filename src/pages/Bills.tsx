import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BillsSummary } from "@/components/bills/BillsSummary";
import { UpcomingBills } from "@/components/bills/UpcomingBills";
import { BillsList } from "@/components/bills/BillsList";
import { RecurringBillsChart } from "@/components/bills/RecurringBillsChart";

const Bills = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Bills Tracking</h1>
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
