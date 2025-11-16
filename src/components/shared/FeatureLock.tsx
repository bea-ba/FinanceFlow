import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppIcons } from "@/config/icons";
import { PremiumUpgradeModal } from "@/components/profile/PremiumUpgradeModal";
import { PremiumBadge } from "@/components/profile/PremiumBadge";

interface FeatureLockProps {
  featureName: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "overlay" | "inline" | "button";
}

export const FeatureLock = ({
  featureName,
  description,
  className = "",
  children,
  variant = "overlay"
}: FeatureLockProps) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (variant === "button") {
    return (
      <>
        <Button
          onClick={() => setShowUpgradeModal(true)}
          variant="outline"
          className={`border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 ${className}`}
        >
          <AppIcons.status.lock className="mr-2 h-4 w-4 text-primary" />
          Unlock {featureName}
          <PremiumBadge className="ml-2" />
        </Button>
        <PremiumUpgradeModal
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          feature={featureName}
        />
      </>
    );
  }

  if (variant === "inline") {
    return (
      <>
        <div
          onClick={() => setShowUpgradeModal(true)}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-all ${className}`}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <AppIcons.status.lock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-foreground">{featureName}</p>
              <PremiumBadge />
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <AppIcons.actions.arrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <PremiumUpgradeModal
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          feature={featureName}
        />
      </>
    );
  }

  // Default: overlay variant
  return (
    <>
      <div className={`relative ${className}`}>
        {children}
        <div
          onClick={() => setShowUpgradeModal(true)}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-background/90 transition-all group"
        >
          <div className="text-center space-y-3 p-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AppIcons.status.lock className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="font-bold text-lg text-foreground">{featureName}</p>
                <PremiumBadge />
              </div>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <AppIcons.ui.sparkles className="mr-2 h-4 w-4" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
      <PremiumUpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        feature={featureName}
      />
    </>
  );
};
