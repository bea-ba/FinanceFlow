import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppIcons } from "@/config/icons";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

export const IncomeSummary = () => {
  const { incomeMonthly, incomeYearly, loading } = useTransactions();

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
              <AppIcons.financial.income className="h-5 w-5 text-primary" />
              Money In this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse h-10 bg-muted rounded" />
            ) : (
              <p className="text-4xl font-bold text-primary">
                €{formatCurrency(incomeMonthly)}
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="yearly">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AppIcons.financial.income className="h-5 w-5 text-primary" />
              Money In this year
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse h-10 bg-muted rounded" />
            ) : (
              <p className="text-4xl font-bold text-primary">
                €{formatCurrency(incomeYearly)}
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
