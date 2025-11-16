import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forgot">("login");

  return (
    <div className="w-full max-w-md">
      {/* Logo/Branding */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
          Finance<span className="text-primary">Flow</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Your financial wellness companion
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
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
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
};
