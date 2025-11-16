import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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
    { name: "Health", value: 298.40, color: "hsl(197 37% 45%)" },
    { name: "Education", value: 456.80, color: "hsl(43 96% 56%)" },
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
      <CardContent className="space-y-6">
        {/* Pie Chart */}
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
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
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => [
                  `$${value.toFixed(2)} (${((value / total) * 100).toFixed(1)}%)`,
                  'Amount'
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total in Center */}
        <div className="text-center -mt-44 mb-32 pointer-events-none">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">${total.toFixed(2)}</p>
        </div>

        {/* Category List */}
        <div className="space-y-2">
          {data.map((category, index) => {
            const percentage = ((category.value / total) * 100).toFixed(1);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">
                    ${category.value.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
