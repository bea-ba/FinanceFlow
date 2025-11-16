import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MoneyOutSummary } from "@/components/money-out/MoneyOutSummary";
import { ImportMoneyOut } from "@/components/money-out/ImportMoneyOut";
import { ExpenseSourceBreakdown } from "@/components/money-out/ExpenseSourceBreakdown";
import { MoneyOutList } from "@/components/money-out/MoneyOutList";

const MoneyOut = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Money Out</h1>
        </div>

        <ImportMoneyOut />
        
        <MoneyOutSummary />
        
        <ExpenseSourceBreakdown />
        
        <MoneyOutList />
      </div>
    </DashboardLayout>
  );
};

export default MoneyOut;
