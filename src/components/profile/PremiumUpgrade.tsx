import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";
import { Badge } from "@/components/ui/badge";

export const PremiumUpgrade = () => {
  const premiumFeatures = [
    {
      icon: AppIcons.actions.upload,
      title: "Unlimited Imports",
      description: "Google Drive, email bills, and photo scanning"
    },
    {
      icon: AppIcons.analytics.ai,
      title: "Advanced Insights",
      description: "AI predictions and personalized suggestions"
    },
    {
      icon: AppIcons.actions.download,
      title: "Auto-Export",
      description: "Automatic Google Sheets sync (weekly/monthly)"
    },
    {
      icon: AppIcons.status.success,
      title: "Ad-Free Experience",
      description: "Enjoy the app without any distractions"
    },
    {
      icon: AppIcons.communication.messageCircle,
      title: "Priority Support",
      description: "Get help when you need it most"
    },
    {
      icon: AppIcons.ui.settings,
      title: "Custom Categories",
      description: "Create unlimited tags and categories"
    }
  ];

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-transparent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-[#FF7F50]/10 rounded-full blur-2xl" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AppIcons.ui.sparkles className="h-6 w-6 text-primary" />
              Upgrade to Premium
            </CardTitle>
            <CardDescription className="mt-2">
              Unlock advanced features and save time with automation
            </CardDescription>
          </div>
          <Badge className="bg-[#00E676] hover:bg-[#00E676]/90 text-white">
            7-Day Free Trial
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="mt-0.5 p-2 rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="font-bold text-2xl text-foreground">€4.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            <p className="text-xs text-muted-foreground mt-1">or €49/year (save 15%)</p>
          </div>
          <Button 
            size="lg"
            className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white min-w-[180px]"
          >
            <AppIcons.ui.sparkles className="mr-2 h-4 w-4" />
            Start Free Trial
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Cancel anytime. No questions asked.
        </p>
      </CardContent>
    </Card>
  );
};
