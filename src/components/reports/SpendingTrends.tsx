import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

export const SpendingTrends = () => {
  // Mockup data - daily spending over last 30 days
  const data = [
    { day: "1", amount: 45.20 },
    { day: "3", amount: 123.50 },
    { day: "5", amount: 67.30 },
    { day: "7", amount: 234.80 },
    { day: "9", amount: 89.40 },
    { day: "11", amount: 156.70 },
    { day: "13", amount: 98.20 },
    { day: "15", amount: 287.50 },
    { day: "17", amount: 134.60 },
    { day: "19", amount: 176.30 },
    { day: "21", amount: 92.80 },
    { day: "23", amount: 245.90 },
    { day: "25", amount: 167.40 },
    { day: "27", amount: 198.60 },
    { day: "29", amount: 143.20 },
  ];

  return (
    <Card>
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
                borderRadius: '8px'
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
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
