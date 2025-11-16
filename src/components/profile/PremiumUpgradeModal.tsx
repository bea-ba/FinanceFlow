import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PremiumUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

export const PremiumUpgradeModal = ({ 
  open, 
  onOpenChange,
  feature = "this feature"
}: PremiumUpgradeModalProps) => {
  const premiumFeatures = [
    {
      icon: AppIcons.actions.upload,
      title: "Unlimited Imports",
      description: "Google Drive, email bills, and photo scanning without limits"
    },
    {
      icon: AppIcons.analytics.ai,
      title: "Advanced AI Insights",
      description: "Smart predictions and personalized financial suggestions"
    },
    {
      icon: AppIcons.actions.download,
      title: "Auto-Export",
      description: "Automatic Google Sheets sync (weekly or monthly)"
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <AppIcons.ui.sparkles className="h-6 w-6 text-primary" />
              Unlock {feature}
            </DialogTitle>
            <Badge className="bg-[#00E676] hover:bg-[#00E676]/90 text-white">
              7-Day Free Trial
            </Badge>
          </div>
          <DialogDescription className="text-base">
            Get full access to all premium features and supercharge your financial tracking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="mt-0.5 p-2 rounded-md bg-primary/10 shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator />

          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-4">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Monthly</p>
                  <p className="text-3xl font-bold text-foreground">€4.99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
                <div className="text-muted-foreground">or</div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Yearly</p>
                    <Badge variant="secondary" className="text-xs">Save 15%</Badge>
                  </div>
                  <p className="text-3xl font-bold text-foreground">€49<span className="text-sm font-normal text-muted-foreground">/yr</span></p>
                </div>
              </div>
            </div>

            <Button 
              size="lg"
              className="w-full bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white text-base h-12"
            >
              <AppIcons.ui.sparkles className="mr-2 h-5 w-5" />
              Start 7-Day Free Trial
            </Button>

            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                No credit card required • Cancel anytime
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <AppIcons.status.success className="h-3.5 w-3.5 text-[#00E676]" />
                <span>After trial: €4.99/month or €49/year</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <AppIcons.ui.security className="h-5 w-5 mx-auto text-primary" />
              <p className="text-xs font-medium">Bank-Level Security</p>
            </div>
            <div className="space-y-1">
              <AppIcons.status.success className="h-5 w-5 mx-auto text-[#00E676]" />
              <p className="text-xs font-medium">Easy Cancellation</p>
            </div>
            <div className="space-y-1">
              <AppIcons.communication.messageCircle className="h-5 w-5 mx-auto text-primary" />
              <p className="text-xs font-medium">Priority Support</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
