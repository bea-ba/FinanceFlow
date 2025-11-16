import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppIcons } from "@/config/icons";

export const MoneyOutSummary = () => {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenseTotals();
  }, []);

  const fetchExpenseTotals = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthStart = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
    const yearStart = new Date(currentYear, 0, 1).toISOString().split('T')[0];

    const { data: monthlyData } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', 'expense')
      .gte('transaction_date', monthStart);

    const { data: yearlyData } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', 'expense')
      .gte('transaction_date', yearStart);

    const monthlySum = monthlyData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    const yearlySum = yearlyData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

    setMonthlyTotal(monthlySum);
    setYearlyTotal(yearlySum);
    setLoading(false);
  };

  return (
    <Tabs defaultValue="monthly" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="monthly">
          <AppIcons.time.calendar className="mr-2 h-4 w-4" />
          This month
        </TabsTrigger>
        <TabsTrigger value="yearly">
          <AppIcons.time.calendarRange className="mr-2 h-4 w-4" />
          This year
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AppIcons.financial.expense className="h-5 w-5 text-destructive" />
              Money Out this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse h-10 bg-muted rounded" />
            ) : (
              <p className="text-4xl font-bold text-destructive">
                €{monthlyTotal.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="yearly">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AppIcons.financial.expense className="h-5 w-5 text-destructive" />
              Money Out this year
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse h-10 bg-muted rounded" />
            ) : (
              <p className="text-4xl font-bold text-destructive">
                €{yearlyTotal.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
