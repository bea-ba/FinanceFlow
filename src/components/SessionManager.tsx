import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SessionManagerProps {
  children: React.ReactNode;
}

export const SessionManager = ({ children }: SessionManagerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for expired session on mount
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        if (import.meta.env.DEV) {
          console.error("Session check error:", error);
        }
      }

      // If session is expired and we're on a protected route, redirect
      const publicRoutes = ["/auth", "/terms", "/privacy"];
      const isPublicRoute = publicRoutes.includes(location.pathname);

      if (!session && !isPublicRoute) {
        toast.error("Your session has expired. Please sign in again.");
        navigate("/auth");
      }
    };

    checkSession();

    // Listen for auth state changes (including token expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (import.meta.env.DEV) {
        console.log("Auth event:", event);
      }

      const publicRoutes = ["/auth", "/terms", "/privacy"];
      const isPublicRoute = publicRoutes.includes(location.pathname);

      // Handle session expiry
      if (event === "TOKEN_REFRESHED") {
        if (import.meta.env.DEV) {
          console.log("Session token refreshed successfully");
        }
      }

      if (event === "SIGNED_OUT") {
        if (!isPublicRoute) {
          toast.info("You have been signed out");
          navigate("/auth");
        }
      }

      // Handle token refresh failures (session expired)
      if (event === "USER_UPDATED" && !session && !isPublicRoute) {
        toast.error("Your session has expired. Please sign in again.");
        navigate("/auth");
      }

      // If user's session becomes null while on a protected route
      if (!session && !isPublicRoute) {
        navigate("/auth");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return <>{children}</>;
};
