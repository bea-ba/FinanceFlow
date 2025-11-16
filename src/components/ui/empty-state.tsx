import { LucideIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 space-y-6", className)}>
      {/* Icon */}
      {Icon && (
        <div className="rounded-full bg-mint-tint p-6">
          <Icon className="h-12 w-12 text-primary" />
        </div>
      )}

      {/* Text Content */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          {action && (
            <Button
              onClick={action.onClick}
              className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="w-full sm:flex-1 border-2 border-info text-info hover:bg-blue-tint rounded-xl h-12"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
