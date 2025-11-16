import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AppIcons } from "@/config/icons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface OnboardingScreen {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
}

const screens: OnboardingScreen[] = [
  {
    title: "Welcome to FinanceFlow",
    description: "Your personal finance companion that makes money management effortless and insightful",
    icon: AppIcons.ui.sparkles,
    gradient: "from-primary/20 via-primary/10 to-transparent",
    features: [
      {
        icon: AppIcons.financial.dollarSign,
        title: "Track Every Dollar",
        description: "Know exactly where your money comes from and where it goes",
      },
      {
        icon: AppIcons.analytics.pieChart,
        title: "Visual Insights",
        description: "Beautiful charts that make your finances crystal clear",
      },
      {
        icon: AppIcons.status.checkCircle,
        title: "Never Miss a Bill",
        description: "Smart reminders keep you on top of all your payments",
      },
    ],
  },
  {
    title: "Track Everything in One Place",
    description: "Record income and expenses in seconds, categorize automatically, and see your financial picture clearly",
    icon: AppIcons.financial.balance,
    gradient: "from-success/20 via-success/10 to-transparent",
    features: [
      {
        icon: AppIcons.financial.income,
        title: "Log Income",
        description: "Salary, freelance gigs, side hustles — track it all",
      },
      {
        icon: AppIcons.financial.expense,
        title: "Track Spending",
        description: "Manual entry or upload receipts for instant categorization",
      },
      {
        icon: AppIcons.actions.upload,
        title: "Scan Receipts",
        description: "Snap a photo and we'll extract all the details",
      },
    ],
  },
  {
    title: "Stay Informed & In Control",
    description: "Get notified about upcoming bills, spending patterns, and important financial moments",
    icon: AppIcons.communication.notification,
    gradient: "from-info/20 via-info/10 to-transparent",
    features: [
      {
        icon: AppIcons.status.alert,
        title: "Bill Reminders",
        description: "Never pay a late fee again with smart notifications",
      },
      {
        icon: AppIcons.analytics.activity,
        title: "Spending Alerts",
        description: "Friendly nudges when you're approaching your limits",
      },
      {
        icon: AppIcons.communication.mail,
        title: "Weekly Summaries",
        description: "Your financial check-in delivered right to your inbox",
      },
    ],
  },
  {
    title: "Get Powerful Insights",
    description: "Understand your money story with beautiful reports, trends, and AI-powered recommendations",
    icon: AppIcons.analytics.brain,
    gradient: "from-warning/20 via-warning/10 to-transparent",
    features: [
      {
        icon: AppIcons.analytics.barChart,
        title: "Visual Reports",
        description: "See trends, patterns, and breakdowns at a glance",
      },
      {
        icon: AppIcons.status.idea,
        title: "Smart Insights",
        description: "AI analyzes your habits and suggests improvements",
      },
      {
        icon: AppIcons.actions.download,
        title: "Export Anywhere",
        description: "Download reports or sync with Google Sheets",
      },
    ],
  },
];

export const OnboardingFlow = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentScreen + 1) / screens.length) * 100;
  const screen = screens[currentScreen];
  const Icon = screen.icon;

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkip = async () => {
    await handleComplete();
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Authentication error");
        navigate("/auth");
        return;
      }

      // Update user profile to mark onboarding as completed
      const { error } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Welcome to FinanceFlow! 🎉");
      navigate("/");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Failed to complete onboarding");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              Step {currentScreen + 1} of {screens.length}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Screen content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${screen.gradient} p-8 md:p-12 border border-border shadow-card`}
          >
            {/* Decorative blob */}
            <div className="absolute -right-8 -top-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -left-8 -bottom-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {screen.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {screen.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {screen.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 border border-border/50 hover:shadow-card transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <FeatureIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentScreen === 0}
                  className="rounded-xl"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isCompleting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl min-w-[140px]"
                >
                  {isCompleting ? (
                    "Completing..."
                  ) : currentScreen === screens.length - 1 ? (
                    <>
                      Get Started
                      <AppIcons.ui.sparkles className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentScreen
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to screen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
