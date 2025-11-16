import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, AlertCircle, CheckCircle, Calendar } from "lucide-react";

export const BillsSummary = () => {
  // Mockup data
  const totalBills = 8;
  const paidBills = 5;
  const unpaidBills = 3;
  const totalAmount = 2847.50;
  const paidAmount = 1620.00;
  const unpaidAmount = 1227.50;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBills}</div>
          <p className="text-xs text-muted-foreground">
            This month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Monthly recurring
          </p>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{paidBills}</div>
          <p className="text-xs text-muted-foreground">
            ${paidAmount.toFixed(2)} paid
          </p>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unpaid</CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{unpaidBills}</div>
          <p className="text-xs text-muted-foreground">
            ${unpaidAmount.toFixed(2)} due
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
