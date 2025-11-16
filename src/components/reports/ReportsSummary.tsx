import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton-loaders";
import { AppIcons } from "@/config/icons";
import { formatCurrency } from "@/lib/utils";

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: string;
  topCategory: string;
  topCategoryAmount: number;
}

export const ReportsSummary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current month date range
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

      // Fetch all transactions for current period
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('transaction_date', startOfMonth)
        .lte('transaction_date', endOfMonth);

      if (!transactions) {
        setData({
          totalIncome: 0,
          totalExpenses: 0,
          netSavings: 0,
          savingsRate: '0.0',
          topCategory: 'None',
          topCategoryAmount: 0
        });
        setLoading(false);
        return;
      }

      // Calculate totals
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      // Calculate top expense category
      const categoryTotals: Record<string, number> = {};
      transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
        });

      const topCategoryEntry = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
      const topCategory = topCategoryEntry ? topCategoryEntry[0] : 'None';
      const topCategoryAmount = topCategoryEntry ? topCategoryEntry[1] : 0;

      // Format category name
      const formatCategory = (cat: string) => {
        return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      const savings = income - expenses;
      const rate = income > 0 ? ((savings / income) * 100).toFixed(1) : '0.0';

      setData({
        totalIncome: income,
        totalExpenses: expenses,
        netSavings: savings,
        savingsRate: rate,
        topCategory: formatCategory(topCategory),
        topCategoryAmount
      });
    } catch (error) {
      console.error("Error fetching summary data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <Card
        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl cursor-pointer"
        onClick={() => navigate("/income")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
            <AppIcons.financial.income className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            €{formatCurrency(data.totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            This month • Click to view
          </p>
        </CardContent>
      </Card>

      <Card
        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl cursor-pointer"
        onClick={() => navigate("/money-out")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
            <AppIcons.financial.expense className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
            €{formatCurrency(data.totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            This month • Click to view
          </p>
        </CardContent>
      </Card>

      <Card className="group border-primary/30 bg-gradient-to-br from-primary/10 to-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <AppIcons.financial.euro className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">
            €{formatCurrency(data.netSavings)}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.savingsRate}% savings rate
          </p>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Top Category</CardTitle>
          <div className="p-1.5 sm:p-2 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors">
            <AppIcons.analytics.pieChart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">{data.topCategory}</div>
          <p className="text-xs text-muted-foreground">
            €{formatCurrency(data.topCategoryAmount)} spent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
