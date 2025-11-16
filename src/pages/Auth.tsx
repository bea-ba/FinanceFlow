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
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/");
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
