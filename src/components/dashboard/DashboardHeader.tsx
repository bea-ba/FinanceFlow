import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  const [userName, setUserName] = useState<string>("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();
        
        setUserName(profile?.full_name || user.email?.split("@")[0] || "User");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between p-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isHomePage ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Hey {userName}! 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                month: "short", 
                day: "numeric" 
              })}
            </p>
          </div>
        ) : (
          <div className="h-10"></div>
        )}
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full animate-pulse" />
        </Button>
      </div>
    </header>
  );
};
