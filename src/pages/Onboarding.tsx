import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

const Onboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Not logged in, redirect to auth
        navigate("/auth");
        return;
      }

      // Check if user has already completed onboarding
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .single();

      if (profile?.onboarding_completed) {
        // Already completed, redirect to dashboard
        navigate("/");
      }
    };

    checkOnboardingStatus();
  }, [navigate]);

  return <OnboardingFlow />;
};

export default Onboarding;
