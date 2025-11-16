import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";
import { PremiumBadge } from "./PremiumBadge";

export const SubscriptionPlan = () => {
  // This would be dynamic based on actual subscription status
  const isPremium = true; // For visual demo purposes

  if (!isPremium) {
    return null; // The PremiumUpgrade component will be shown instead
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AppIcons.financial.creditCard className="h-5 w-5" />
          Subscription Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-foreground">Premium Plan</p>
              <PremiumBadge />
            </div>
            <p className="text-sm text-muted-foreground">€4.99/month</p>
          </div>
          <AppIcons.status.success className="h-6 w-6 text-[#00E676]" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <AppIcons.status.success className="h-4 w-4 text-[#00E676]" />
            <span className="text-muted-foreground">Next billing: <span className="text-foreground font-medium">Jan 15, 2026</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AppIcons.status.success className="h-4 w-4 text-[#00E676]" />
            <span className="text-muted-foreground">Auto-renewal enabled</span>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
          >
            <AppIcons.ui.settings className="mr-2 h-4 w-4" />
            Manage Subscription
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:text-destructive"
          >
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
