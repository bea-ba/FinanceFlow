import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="mb-2 text-5xl font-extrabold text-foreground">
          Finance<span className="text-primary">Flow</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome back, {session.user.user_metadata?.full_name || session.user.email}!
        </p>
        
        <div className="bg-card rounded-2xl shadow-lg p-8 mb-6">
          <p className="text-lg text-muted-foreground mb-4">
            🎉 Authentication is working! You're successfully logged in.
          </p>
          <p className="text-sm text-muted-foreground">
            The dashboard and other features will be added in the next phases.
          </p>
        </div>

        <Button
          onClick={handleSignOut}
          variant="outline"
          className="w-full h-12"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Index;
