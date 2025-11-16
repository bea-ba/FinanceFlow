import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { toast } from "sonner";

export const UpcomingBills = () => {
  // Mockup data - bills due in next 7 days
  const upcomingBills = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: 15.99,
      dueDate: addDays(new Date(), 2),
      category: "entertainment",
      status: "unpaid"
    },
    {
      id: 2,
      name: "Electric Bill",
      amount: 125.50,
      dueDate: addDays(new Date(), 3),
      category: "utilities",
      status: "unpaid"
    },
    {
      id: 3,
      name: "Internet Service",
      amount: 79.99,
      dueDate: addDays(new Date(), 5),
      category: "utilities",
      status: "unpaid"
    },
  ];

  const handleMarkAsPaid = (billName: string) => {
    toast.success(`${billName} marked as paid`);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const days = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `Due in ${days} days`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-orange-500" />
          Upcoming Bills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingBills.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No upcoming bills</p>
        ) : (
          upcomingBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{bill.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {bill.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(bill.dueDate, "MMM d, yyyy")} • {getDaysUntilDue(bill.dueDate)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold">${bill.amount.toFixed(2)}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkAsPaid(bill.name)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
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
