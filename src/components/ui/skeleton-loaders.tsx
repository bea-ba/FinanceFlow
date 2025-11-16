import { Card } from "./card";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

// Card Skeleton for summary cards
export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("p-6 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-3 w-20" />
    </Card>
  );
};

// List Item Skeleton
export const ListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  );
};

// List Skeleton (multiple items)
export const ListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
};

// Chart Skeleton
export const ChartSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("p-6 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-3 pt-4">
        <div className="flex items-end gap-2 h-48">
          <Skeleton className="flex-1 h-32" />
          <Skeleton className="flex-1 h-40" />
          <Skeleton className="flex-1 h-28" />
          <Skeleton className="flex-1 h-44" />
          <Skeleton className="flex-1 h-36" />
          <Skeleton className="flex-1 h-42" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </Card>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-border">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24 ml-auto" />
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
      ))}
    </div>
  );
};

// Full Page Skeleton
export const PageSkeleton = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <Card className="p-6">
          <ListSkeleton count={4} />
        </Card>
      </div>
    </div>
  );
};
