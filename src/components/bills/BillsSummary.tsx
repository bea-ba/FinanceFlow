import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";
import { Calendar } from "lucide-react";

export const BillsSummary = () => {
  const [totalBills, setTotalBills] = useState(0);
  const [paidBills, setPaidBills] = useState(0);
  const [unpaidBills, setUnpaidBills] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);

  useEffect(() => {
    fetchBillsSummary();
  }, []);

  const fetchBillsSummary = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: bills } = await supabase
      .from('bills')
      .select('*')
      .eq('is_active', true);

    if (bills) {
      const total = bills.length;
      const paid = bills.filter(b => b.status === 'paid').length;
      const unpaid = bills.filter(b => b.status === 'unpaid' || b.status === 'overdue').length;

      const totalAmt = bills.reduce((sum, b) => sum + Number(b.amount), 0);
      const paidAmt = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + Number(b.amount), 0);
      const unpaidAmt = bills.filter(b => b.status === 'unpaid' || b.status === 'overdue').reduce((sum, b) => sum + Number(b.amount), 0);

      setTotalBills(total);
      setPaidBills(paid);
      setUnpaidBills(unpaid);
      setTotalAmount(totalAmt);
      setPaidAmount(paidAmt);
      setUnpaidAmount(unpaidAmt);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBills}</div>
          <p className="text-xs text-muted-foreground">
            Active bills
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          <AppIcons.financial.money className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Monthly recurring
          </p>
        </CardContent>
      </Card>

      <Card className="border-success/20 bg-mint-tint shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
          <AppIcons.status.checkCircle className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{paidBills}</div>
          <p className="text-xs text-muted-foreground">
            ${paidAmount.toFixed(2)} paid
          </p>
        </CardContent>
      </Card>

      <Card className="border-warning/20 bg-coral-tint shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unpaid</CardTitle>
          <AppIcons.status.alert className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{unpaidBills}</div>
          <p className="text-xs text-muted-foreground">
            ${unpaidAmount.toFixed(2)} due
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
