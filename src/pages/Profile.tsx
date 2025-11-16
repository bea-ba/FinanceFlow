import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SmartConnections } from "@/components/profile/SmartConnections";
import { AIPreferences } from "@/components/profile/AIPreferences";
import { NotificationSettings } from "@/components/profile/NotificationSettings";
import { ThemeSettings } from "@/components/profile/ThemeSettings";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { PremiumUpgrade } from "@/components/profile/PremiumUpgrade";
import { SubscriptionPlan } from "@/components/profile/SubscriptionPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Sparkles, Link2, CreditCard, User } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-transparent p-8 border border-primary/20 shadow-card">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings, preferences, and integrations
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <ProfileHeader />

        {/* Premium subscription section */}
        <PremiumUpgrade />
        {/* Uncomment below when user has premium */}
        {/* <SubscriptionPlan /> */}

        {/* Settings Tabs */}
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto rounded-xl">
            <TabsTrigger value="connections" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Link2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Connections</span>
              <span className="sm:hidden">Connect</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">AI & Insights</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Appearance</span>
              <span className="sm:hidden">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Account</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="mt-6">
            <SmartConnections />
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <AIPreferences />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <ThemeSettings />
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
