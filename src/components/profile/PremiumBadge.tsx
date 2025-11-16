import { Badge } from "@/components/ui/badge";
import { AppIcons } from "@/config/icons";

interface PremiumBadgeProps {
  className?: string;
}

export const PremiumBadge = ({ className }: PremiumBadgeProps) => {
  return (
    <Badge 
      variant="default" 
      className={`bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white ${className}`}
    >
      <AppIcons.ui.sparkles className="h-3 w-3 mr-1" />
      Premium
    </Badge>
  );
};
