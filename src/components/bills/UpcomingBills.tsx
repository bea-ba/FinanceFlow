import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";
import { format, differenceInDays, addDays } from "date-fns";
import { toast } from "sonner";

interface UpcomingBill {
  id: string;
  name: string;
  amount: number;
  next_due_date: string;
  category: string;
  status: string;
  frequency: string;
}

export const UpcomingBills = () => {
  const [upcomingBills, setUpcomingBills] = useState<UpcomingBill[]>([]);

  useEffect(() => {
    fetchUpcomingBills();
  }, []);

  const fetchUpcomingBills = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Get bills due in next 7 days
    const sevenDaysFromNow = addDays(new Date(), 7).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const { data: bills } = await supabase
      .from('bills')
      .select('*')
      .eq('is_active', true)
      .in('status', ['unpaid', 'overdue'])
      .gte('next_due_date', today)
      .lte('next_due_date', sevenDaysFromNow)
      .order('next_due_date', { ascending: true })
      .limit(5);

    if (bills) {
      setUpcomingBills(bills);
    }
  };

  const handleMarkAsPaid = async (bill: UpcomingBill) => {
    // Calculate next due date based on frequency
    const currentDueDate = new Date(bill.next_due_date);
    let nextDueDate = new Date(currentDueDate);

    switch (bill.frequency) {
      case 'weekly':
        nextDueDate.setDate(currentDueDate.getDate() + 7);
        break;
      case 'monthly':
        nextDueDate.setMonth(currentDueDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDueDate.setFullYear(currentDueDate.getFullYear() + 1);
        break;
    }

    const { error } = await supabase
      .from('bills')
      .update({
        status: 'paid',
        last_paid_date: new Date().toISOString().split('T')[0],
        next_due_date: nextDueDate.toISOString().split('T')[0]
      })
      .eq('id', bill.id);

    if (error) {
      toast.error("Failed to mark bill as paid");
    } else {
      toast.success(`${bill.name} marked as paid`);
      fetchUpcomingBills();
    }
  };

  const getDaysUntilDue = (dueDateStr: string) => {
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const days = differenceInDays(dueDate, today);
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    if (days < 0) return "Overdue";
    return `Due in ${days} days`;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AppIcons.status.alert className="h-5 w-5 text-warning" />
          Upcoming Bills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingBills.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No upcoming bills in the next 7 days</p>
        ) : (
          upcomingBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-foreground">{bill.name}</p>
                  <Badge variant="outline" className="text-xs capitalize">
                    {bill.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(bill.next_due_date), "MMM d, yyyy")} • {getDaysUntilDue(bill.next_due_date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold">€{Number(bill.amount).toFixed(2)}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkAsPaid(bill)}
                  className="rounded-xl"
                >
                  <AppIcons.status.checkCircle className="h-4 w-4 mr-1" />
                  Pay
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
