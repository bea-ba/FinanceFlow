import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BillsSummary } from "@/components/bills/BillsSummary";
import { UpcomingBills } from "@/components/bills/UpcomingBills";
import { BillsList } from "@/components/bills/BillsList";
import { RecurringBillsChart } from "@/components/bills/RecurringBillsChart";

const Bills = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-primary text-2xl font-bold">
          Loading...
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Bills Tracking</h1>
        </div>

        <BillsSummary />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingBills />
          <RecurringBillsChart />
        </div>

        <BillsList />
      </div>
    </DashboardLayout>
  );
};

export default Bills;
