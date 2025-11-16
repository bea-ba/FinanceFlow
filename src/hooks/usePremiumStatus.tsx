import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PremiumStatus {
  isPremium: boolean;
  isLoading: boolean;
  trialEndsAt: string | null;
}

export const usePremiumStatus = (): PremiumStatus => {
  const [status, setStatus] = useState<PremiumStatus>({
    isPremium: false,
    isLoading: true,
    trialEndsAt: null,
  });

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setStatus({ isPremium: false, isLoading: false, trialEndsAt: null });
          return;
        }

        // Check if user has premium field in their profile
        // For now, we'll assume all users are on free plan
        // In a real implementation, this would check a subscription table
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // TODO: Add premium_tier and trial_ends_at fields to profiles table
        // For now, default to free plan
        setStatus({
          isPremium: false, // profile?.premium_tier === 'premium'
          isLoading: false,
          trialEndsAt: null, // profile?.trial_ends_at
        });
      } catch (error) {
        console.error("Error checking premium status:", error);
        setStatus({ isPremium: false, isLoading: false, trialEndsAt: null });
      }
    };

    checkPremiumStatus();
  }, []);

  return status;
};
