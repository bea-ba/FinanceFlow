import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/skeleton-loaders";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DayData {
  day: string;
  amount: number;
}

export const SpendingTrends = () => {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpendingTrends();
  }, []);

  const fetchSpendingTrends = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current month transactions
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'expense')
        .gte('transaction_date', startOfMonth)
        .lte('transaction_date', endOfMonth)
        .order('transaction_date', { ascending: true });

      if (!transactions || transactions.length === 0) {
        setData([]);
        setLoading(false);
        return;
      }

      // Aggregate by day
      const dailyTotals: Record<string, number> = {};
      transactions.forEach(t => {
        const day = new Date(t.transaction_date).getDate().toString();
        dailyTotals[day] = (dailyTotals[day] || 0) + Number(t.amount);
      });

      // Convert to chart format and sort by day
      const chartData: DayData[] = Object.entries(dailyTotals)
        .map(([day, amount]) => ({
          day,
          amount
        }))
        .sort((a, b) => parseInt(a.day) - parseInt(b.day));

      setData(chartData);
    } catch (error) {
      console.error("Error fetching spending trends:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ChartSkeleton />;
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Daily Spending Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">No spending data available for this month</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Daily Spending Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="day" className="text-xs" label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => `€${formatCurrency(value)}`}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
