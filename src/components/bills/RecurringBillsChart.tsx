import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Repeat } from "lucide-react";

export const RecurringBillsChart = () => {
  // Mockup data - monthly recurring bills by category
  const recurringBills = [
    { category: "Utilities", amount: 425.48, color: "bg-blue-500" },
    { category: "Subscriptions", amount: 89.96, color: "bg-purple-500" },
    { category: "Insurance", amount: 350.00, color: "bg-green-500" },
    { category: "Rent/Mortgage", amount: 1500.00, color: "bg-orange-500" },
  ];

  const totalRecurring = recurringBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-primary" />
          Monthly Recurring Bills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">Total Monthly Recurring</p>
          <p className="text-3xl font-bold text-primary">${totalRecurring.toFixed(2)}</p>
        </div>

        {recurringBills.map((bill) => {
          const percentage = (bill.amount / totalRecurring) * 100;
          return (
            <div key={bill.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${bill.color}`} />
                  <span className="font-medium text-sm">{bill.category}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ${bill.amount.toFixed(2)} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
