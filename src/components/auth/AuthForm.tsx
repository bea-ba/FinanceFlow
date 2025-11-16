import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";

interface AuthFormProps {
  initialTab?: "login" | "signup";
  onBack?: () => void;
}

export const AuthForm = ({ initialTab = "login", onBack }: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forgot">(initialTab);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="w-full max-w-md">
      {/* Back Button */}
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}

      {/* Logo/Branding */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Finance<span className="text-primary">Flow</span>
        </h1>
        <p className="text-muted-foreground text-base">
          My financial wellness companion
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
        {activeTab === "forgot" ? (
          <ForgotPasswordForm onBack={() => setActiveTab("login")} />
        ) : (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onForgotPassword={() => setActiveTab("forgot")} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Footer Text */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
};
