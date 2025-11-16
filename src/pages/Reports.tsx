import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReportsSummary } from "@/components/reports/ReportsSummary";
import { IncomeVsExpenses } from "@/components/reports/IncomeVsExpenses";
import { SpendingTrends } from "@/components/reports/SpendingTrends";
import { CategoryBreakdown } from "@/components/reports/CategoryBreakdown";
import { MonthlyComparison } from "@/components/reports/MonthlyComparison";
import { ExportReports } from "@/components/reports/ExportReports";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 w-full overflow-x-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">Your Flow</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <DateRangeFilter />
            <ExportReports />
          </div>
        </div>

        <ReportsSummary />
        
        <IncomeVsExpenses />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingTrends />
          <CategoryBreakdown />
        </div>

        <MonthlyComparison />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
