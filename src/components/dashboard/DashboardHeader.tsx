import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  const [userName, setUserName] = useState<string>("");

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
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Hello, {userName}! 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { 
              weekday: "long", 
              month: "short", 
              day: "numeric" 
            })}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
        </Button>
      </div>
    </header>
  );
};
