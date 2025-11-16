import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart } from "lucide-react";

interface IncomeSource {
  category: string;
  total: number;
  percentage: number;
}

export const IncomeSourceBreakdown = () => {
  const [sources, setSources] = useState<IncomeSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncomeSources();
  }, []);

  const fetchIncomeSources = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('transactions')
      .select('category, amount')
      .eq('type', 'income');

    if (data) {
      const categoryTotals = data.reduce((acc, t) => {
        const category = t.category;
        acc[category] = (acc[category] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

      const totalIncome = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

      const sourcesData = Object.entries(categoryTotals).map(([category, total]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        total,
        percentage: (total / totalIncome) * 100
      })).sort((a, b) => b.total - a.total);

      setSources(sourcesData);
    }
    setLoading(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Salary: "bg-primary",
      Freelance: "bg-secondary",
      Business: "bg-accent",
      Other: "bg-muted-foreground"
    };
    return colors[category] || "bg-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Income Source Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded" />
            ))}
          </div>
        ) : sources.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No income data available</p>
        ) : (
          sources.map((source) => (
            <div key={source.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{source.category}</span>
                <span className="text-sm text-muted-foreground">
                  ${source.total.toFixed(2)} ({source.percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={source.percentage} className="h-2" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
