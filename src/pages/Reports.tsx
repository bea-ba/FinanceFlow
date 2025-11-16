import { lazy, Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ReportsSummary } from "@/components/reports/ReportsSummary";
import { ExportReports } from "@/components/reports/ExportReports";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load chart components to reduce initial bundle size
const AIInsights = lazy(() => import("@/components/reports/AIInsights").then(m => ({ default: m.AIInsights })));
const SmartPredictions = lazy(() => import("@/components/reports/SmartPredictions").then(m => ({ default: m.SmartPredictions })));
const IncomeVsExpenses = lazy(() => import("@/components/reports/IncomeVsExpenses").then(m => ({ default: m.IncomeVsExpenses })));
const SpendingTrends = lazy(() => import("@/components/reports/SpendingTrends").then(m => ({ default: m.SpendingTrends })));
const CategoryBreakdown = lazy(() => import("@/components/reports/CategoryBreakdown").then(m => ({ default: m.CategoryBreakdown })));
const MonthlyComparison = lazy(() => import("@/components/reports/MonthlyComparison").then(m => ({ default: m.MonthlyComparison })));

// Loading skeleton for charts
const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32 mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-64 w-full" />
    </CardContent>
  </Card>
);

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 w-full overflow-x-hidden">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-transparent p-4 sm:p-6 border border-primary/20">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Flow</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                AI-powered insights into my financial rhythm
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <DateRangeFilter />
              <ExportReports />
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <ReportsSummary />

        {/* AI Intelligence Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <AIInsights />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <SmartPredictions />
          </Suspense>
        </div>

        <Suspense fallback={<ChartSkeleton />}>
          <IncomeVsExpenses />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <SpendingTrends />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <CategoryBreakdown />
          </Suspense>
        </div>

        <Suspense fallback={<ChartSkeleton />}>
          <MonthlyComparison />
        </Suspense>
      </div>
      <QuickActions />
    </DashboardLayout>
  );
};

export default Reports;
