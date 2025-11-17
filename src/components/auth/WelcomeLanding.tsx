import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles, Shield, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeLandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onTryDemo: () => void;
}

export const WelcomeLanding = ({ onGetStarted, onSignIn, onTryDemo }: WelcomeLandingProps) => {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Finance<span className="text-primary">Flow</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Your financial wellness companion
          </p>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your finances,<br />
            finally <span className="text-primary">freeing.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
            Effortlessly track spending, visualize your growth, and manage receipts from Google Drive.
            Take control with your personal finance assistant.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 bg-mint-tint px-4 py-2 rounded-full">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Visual Insights</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-tint px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-info" />
            <span className="text-sm font-medium text-foreground">Auto Import</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-tint px-4 py-2 rounded-full">
            <Shield className="h-4 w-4 text-chart-4" />
            <span className="text-sm font-medium text-foreground">Secure & Private</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="w-full max-w-md h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-xl shadow-glow"
          >
            Create Your Free Account
          </Button>

          <button
            onClick={onSignIn}
            className="text-info hover:text-info/90 font-medium text-base transition-colors"
          >
            Already have an account? <span className="underline">Sign In</span>
          </button>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative bg-background px-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Or</span>
            </div>
          </div>

          <Button
            onClick={onTryDemo}
            variant="outline"
            size="lg"
            className="w-full max-w-md h-12 border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 text-foreground font-medium text-base rounded-xl"
          >
            <Eye className="mr-2 h-5 w-5 text-primary" />
            Try Demo (No Signup Required)
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-muted-foreground mt-12"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </div>
    </div>
  );
};
