import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const IncomeVsExpenses = () => {
  // Mockup data - last 6 months
  const data = [
    { month: "Jun", income: 8200, expenses: 6100 },
    { month: "Jul", income: 8500, expenses: 6350 },
    { month: "Aug", income: 8300, expenses: 5900 },
    { month: "Sep", income: 8700, expenses: 6200 },
    { month: "Oct", income: 9100, expenses: 5800 },
    { month: "Nov", income: 8950, expenses: 5847 },
  ];

  return (
    <Card className="shadow-card rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Income vs Expenses Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
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
            <Legend />
            <Bar dataKey="income" fill="hsl(var(--primary))" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(var(--destructive))" name="Expenses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
