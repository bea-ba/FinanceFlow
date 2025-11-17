import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SmartConnections } from "@/components/profile/SmartConnections";
import { AIPreferences } from "@/components/profile/AIPreferences";
import { ThemeSettings } from "@/components/profile/ThemeSettings";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { PremiumUpgrade } from "@/components/profile/PremiumUpgrade";
import { SubscriptionPlan } from "@/components/profile/SubscriptionPlan";

const Profile = () => {
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
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-transparent p-6 border border-primary/20">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-foreground mb-1">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <ProfileHeader />

        {/* Premium subscription section */}
        <PremiumUpgrade />
        {/* Uncomment below when user has premium */}
        {/* <SubscriptionPlan /> */}

        {/* Focus on automation and smart connections */}
        <SmartConnections />

        <AIPreferences />

        <ThemeSettings />

        <AccountSettings />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
