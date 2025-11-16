import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PremiumBadge } from "./PremiumBadge";
import { PremiumUpgradeModal } from "./PremiumUpgradeModal";
import { cn } from "@/lib/utils";

interface LockedFeatureProps {
  children: ReactNode;
  tooltipText?: string;
  featureName?: string;
  className?: string;
  showOverlay?: boolean;
  badgePosition?: "top-right" | "top-left" | "inline";
}

export const LockedFeature = ({ 
  children, 
  tooltipText = "Unlock with Premium",
  featureName = "Premium Features",
  className,
  showOverlay = true,
  badgePosition = "top-right"
}: LockedFeatureProps) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleClick = () => {
    setShowUpgradeModal(true);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={cn("relative group", className)}
              onClick={handleClick}
            >
              {/* Premium badge */}
              {badgePosition === "top-right" && (
                <div className="absolute -top-2 -right-2 z-10">
                  <PremiumBadge />
                </div>
              )}
              {badgePosition === "top-left" && (
                <div className="absolute -top-2 -left-2 z-10">
                  <PremiumBadge />
                </div>
              )}
              
              {/* Content */}
              <div className={cn(showOverlay && "opacity-60 pointer-events-none")}>
                {children}
              </div>
              
              {/* Overlay with blur effect */}
              {showOverlay && (
                <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] rounded-lg cursor-pointer transition-all hover:bg-background/30" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-2">
              {tooltipText}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PremiumUpgradeModal 
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        feature={featureName}
      />
    </>
  );
};
