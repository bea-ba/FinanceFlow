import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { IncomeSummary } from "@/components/income/IncomeSummary";
import { IncomeSourceBreakdown } from "@/components/income/IncomeSourceBreakdown";
import { IncomeList } from "@/components/income/IncomeList";
import { ImportFromDrive } from "@/components/income/ImportFromDrive";

const Income = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Income Tracking</h1>
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
