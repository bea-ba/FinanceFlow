import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Target } from "lucide-react";

export const CategoryBreakdown = () => {
  // Mockup data - expense breakdown by category
  const data = [
    { name: "Groceries", value: 1248.50, color: "hsl(var(--chart-1))" },
    { name: "Dining", value: 876.30, color: "hsl(var(--chart-2))" },
    { name: "Transport", value: 654.20, color: "hsl(var(--chart-3))" },
    { name: "Utilities", value: 425.48, color: "hsl(var(--chart-4))" },
    { name: "Entertainment", value: 387.90, color: "hsl(var(--chart-5))" },
    { name: "Shopping", value: 723.50, color: "hsl(142 76% 36%)" },
    { name: "Health", value: 298.40, color: "hsl(197 37% 24%)" },
    { name: "Education", value: 456.80, color: "hsl(43 74% 66%)" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Expense Category Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [
                `$${value.toFixed(2)} (${((value / total) * 100).toFixed(1)}%)`,
                'Amount'
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold">${total.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
