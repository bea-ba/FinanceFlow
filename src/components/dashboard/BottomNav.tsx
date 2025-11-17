import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/icons";

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50" style={{ height: 'var(--bottom-nav-height)' }}>
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "scale-110")} />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
