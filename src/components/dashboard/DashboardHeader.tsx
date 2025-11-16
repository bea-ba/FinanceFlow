import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AppIcons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  { id: 1, title: "Payment received", message: "Your salary for March has been credited", time: "2h ago", unread: true, type: "income" },
  { id: 2, title: "Bill reminder", message: "Electricity bill due in 3 days", time: "5h ago", unread: true, type: "bill" },
  { id: 3, title: "Budget alert", message: "You've spent 80% of your dining budget", time: "1d ago", unread: false, type: "alert" },
  { id: 4, title: "Savings milestone", message: "Congratulations! You've saved $5,000 this month", time: "2d ago", unread: false, type: "success" },
];

export const DashboardHeader = () => {
  const [userName, setUserName] = useState<string>("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
              <AppIcons.communication.notification className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full animate-pulse" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <Badge variant="secondary" className="text-xs">
                {mockNotifications.filter(n => n.unread).length} new
              </Badge>
            </div>
            <ScrollArea className="h-[320px]">
              <div className="divide-y divide-border">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      notification.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                        notification.unread ? "bg-primary" : "bg-transparent"
                      }`} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t border-border p-2">
              <Button variant="ghost" className="w-full text-sm text-primary hover:text-primary hover:bg-primary/10">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
