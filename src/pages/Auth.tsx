import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { WelcomeLanding } from "@/components/auth/WelcomeLanding";
import { AuthForm } from "@/components/auth/AuthForm";

const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [initialTab, setInitialTab] = useState<"login" | "signup">("signup");

  useEffect(() => {
    const checkSessionAndRedirect = async (session: any) => {
      if (!session?.user) return;

      // Check if user profile exists and onboarding status
      const { data: profile } = await supabase
        .from("profiles")
        .select("created_at, onboarding_completed")
        .eq("id", session.user.id)
        .single();

      if (profile && !profile.onboarding_completed) {
        // User hasn't completed onboarding yet
        navigate("/onboarding");
      } else {
        // User has completed onboarding or returning user
        navigate("/");
      }
    };

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkSessionAndRedirect(session);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkSessionAndRedirect(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // If user is already logged in, redirect
  if (user) {
    return null;
  }

  // Show welcome landing or auth form
  if (!showAuthForm) {
    return (
      <WelcomeLanding
        onGetStarted={() => {
          setInitialTab("signup");
          setShowAuthForm(true);
        }}
        onSignIn={() => {
          setInitialTab("login");
          setShowAuthForm(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <AuthForm
        initialTab={initialTab}
        onBack={() => setShowAuthForm(false)}
      />
    </div>
  );
};

export default Auth;
