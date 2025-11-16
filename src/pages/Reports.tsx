import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReportsSummary } from "@/components/reports/ReportsSummary";
import { AIInsights } from "@/components/reports/AIInsights";
import { SmartPredictions } from "@/components/reports/SmartPredictions";
import { IncomeVsExpenses } from "@/components/reports/IncomeVsExpenses";
import { SpendingTrends } from "@/components/reports/SpendingTrends";
import { CategoryBreakdown } from "@/components/reports/CategoryBreakdown";
import { MonthlyComparison } from "@/components/reports/MonthlyComparison";
import { ExportReports } from "@/components/reports/ExportReports";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 w-full overflow-x-hidden">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-transparent p-6 border border-primary/20">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">My Flow</h1>
              <p className="text-muted-foreground">
                AI-powered insights into my financial rhythm
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <DateRangeFilter />
              <ExportReports />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <ReportsSummary />
        
        {/* AI Intelligence Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIInsights />
          <SmartPredictions />
        </div>

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
