import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
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
      <div className="space-y-8">
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-success/5 p-8 border border-primary/20">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My financial flow
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Everything's looking smooth. Keep the momentum going.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -left-8 -top-8 w-48 h-48 bg-success/5 rounded-full blur-3xl" />
        </div>

        {/* Summary Cards */}
        <SummaryCards />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <SpendingChart />
        </div>
      </div>

      <QuickActions />
    </DashboardLayout>
  );
};

export default Index;
