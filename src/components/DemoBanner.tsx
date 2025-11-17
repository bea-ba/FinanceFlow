import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";
import { useDemoMode } from "@/contexts/DemoModeContext";

/**
 * DemoBanner - Sticky banner shown when user is in demo mode
 * Provides clear indication of demo status with CTA to sign up
 */
export const DemoBanner = () => {
  const navigate = useNavigate();
  const { isDemoMode, exitDemoMode } = useDemoMode();

  if (!isDemoMode) return null;

  const handleSignUp = () => {
    exitDemoMode();
    navigate("/auth");
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/90 to-primary border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Demo indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm sm:text-base">
                🎨 Demo Mode
              </p>
              <p className="text-white/90 text-xs hidden sm:block">
                You're exploring with sample data
              </p>
            </div>
          </div>

          {/* Right side - CTAs */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSignUp}
              size="sm"
              className="bg-white hover:bg-white/90 text-primary font-semibold shadow-glow h-9 px-4 rounded-lg"
            >
              <span className="hidden sm:inline">Sign Up to Save Data</span>
              <span className="sm:hidden">Sign Up</span>
            </Button>
            <button
              onClick={exitDemoMode}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Exit demo mode"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
