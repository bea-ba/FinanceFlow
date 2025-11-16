import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Activity, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

export const SpendingTrends = () => {
  const { dailyTrendsMonthly, loading } = useTransactions();

  // Calculate cumulative net position
  const cumulativeNetData = useMemo(() => {
    if (!dailyTrendsMonthly || dailyTrendsMonthly.length === 0) return [];

    let cumulativeNet = 0;
    return dailyTrendsMonthly.map(day => {
      cumulativeNet += (day.income - day.expenses);
      return {
        day: day.day,
        netPosition: cumulativeNet
      };
    });
  }, [dailyTrendsMonthly]);

  // Calculate average spending by day of week
  const dayOfWeekData = useMemo(() => {
    if (!dailyTrendsMonthly || dailyTrendsMonthly.length === 0) return [];

    // Get current month/year to properly calculate day of week
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Group by day of week
    const dayOfWeekTotals: Record<number, { total: number; count: number }> = {
      0: { total: 0, count: 0 }, // Sunday
      1: { total: 0, count: 0 }, // Monday
      2: { total: 0, count: 0 }, // Tuesday
      3: { total: 0, count: 0 }, // Wednesday
      4: { total: 0, count: 0 }, // Thursday
      5: { total: 0, count: 0 }, // Friday
      6: { total: 0, count: 0 }, // Saturday
    };

    dailyTrendsMonthly.forEach(day => {
      const date = new Date(currentYear, currentMonth, parseInt(day.day));
      const dayOfWeek = date.getDay();

      dayOfWeekTotals[dayOfWeek].total += day.expenses;
      dayOfWeekTotals[dayOfWeek].count += 1;
    });

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames.map((name, index) => ({
      day: name,
      average: dayOfWeekTotals[index].count > 0
        ? dayOfWeekTotals[index].total / dayOfWeekTotals[index].count
        : 0
    }));
  }, [dailyTrendsMonthly]);

  // Custom tooltip for net position
  const NetPositionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isPositive = value >= 0;
      return (
        <div className="bg-background border border-border rounded-xl p-3 shadow-elevated">
          <p className="text-xs text-muted-foreground">Day {payload[0].payload.day}</p>
          <p className={`font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}€{formatCurrency(Math.abs(value))}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPositive ? 'Ahead' : 'Behind'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for day of week
  const DayOfWeekTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-xl p-3 shadow-elevated">
          <p className="font-semibold text-sm">{payload[0].payload.day}</p>
          <p className="text-destructive font-bold">€{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">Avg spent</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <ChartSkeleton />;
  }

  if (dailyTrendsMonthly.length === 0) {
    return (
      <Card className="shadow-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Financial Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No transactions this month yet</p>
            <p className="text-sm text-muted-foreground">Add some to see your flow</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentNetPosition = cumulativeNetData[cumulativeNetData.length - 1]?.netPosition || 0;
  const isPositive = currentNetPosition >= 0;

  return (
    <Card className="shadow-card rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Financial Flow
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Track your progress and spending patterns
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Chart: Cumulative Net Position */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Net Position This Month</h3>
            <div className="text-right">
              <p className={`text-lg font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}€{formatCurrency(Math.abs(currentNetPosition))}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPositive ? 'In surplus' : 'In deficit'}
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={cumulativeNetData}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="day"
                className="text-xs"
                label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }}
              />
              <YAxis className="text-xs" />
              <Tooltip content={<NetPositionTooltip />} />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="netPosition"
                stroke={isPositive ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)"}
                strokeWidth={2}
                fill={isPositive ? "url(#colorPositive)" : "url(#colorNegative)"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary Chart: Day of Week Pattern */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Spending by Day of Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<DayOfWeekTooltip />} />
              <Bar
                dataKey="average"
                fill="hsl(var(--destructive))"
                radius={[8, 8, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
