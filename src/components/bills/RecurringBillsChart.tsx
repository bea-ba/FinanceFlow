import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppIcons } from "@/config/icons";

interface CategorySummary {
  category: string;
  amount: number;
  color: string;
}

export const RecurringBillsChart = () => {
  const [recurringBills, setRecurringBills] = useState<CategorySummary[]>([]);
  const [totalRecurring, setTotalRecurring] = useState(0);

  useEffect(() => {
    fetchRecurringBills();
  }, []);

  const fetchRecurringBills = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: bills } = await supabase
      .from('bills')
      .select('*')
      .eq('is_active', true)
      .eq('frequency', 'monthly');

    if (bills) {
      // Group by category
      const categoryMap: Record<string, number> = {};
      bills.forEach(bill => {
        const category = bill.category;
        categoryMap[category] = (categoryMap[category] || 0) + Number(bill.amount);
      });

      // Color mapping for categories
      const colorMap: Record<string, string> = {
        utilities: "bg-sky-blue",
        subscriptions: "bg-purple-500",
        insurance: "bg-success",
        housing: "bg-warning",
        entertainment: "bg-info",
        health: "bg-mint-tint",
        transport: "bg-coral-tint",
        other: "bg-muted",
      };

      const categorySummaries: CategorySummary[] = Object.entries(categoryMap).map(([category, amount]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount,
        color: colorMap[category] || "bg-muted"
      }));

      const total = categorySummaries.reduce((sum, cat) => sum + cat.amount, 0);

      setRecurringBills(categorySummaries);
      setTotalRecurring(total);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AppIcons.ui.repeat className="h-5 w-5 text-primary" />
          Monthly Recurring Bills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">Total Monthly Recurring</p>
          <p className="text-3xl font-bold text-primary">€{totalRecurring.toFixed(2)}</p>
        </div>

        {recurringBills.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No monthly recurring bills yet</p>
        ) : (
          recurringBills.map((bill) => {
            const percentage = totalRecurring > 0 ? (bill.amount / totalRecurring) * 100 : 0;
            return (
              <div key={bill.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${bill.color}`} />
                    <span className="font-medium text-sm">{bill.category}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    €{bill.amount.toFixed(2)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
