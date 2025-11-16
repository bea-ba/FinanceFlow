import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SmartConnections } from "@/components/profile/SmartConnections";
import { AIPreferences } from "@/components/profile/AIPreferences";
import { ThemeSettings } from "@/components/profile/ThemeSettings";
import { AccountSettings } from "@/components/profile/AccountSettings";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-transparent p-6 border border-primary/20">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-foreground mb-1">My Profile</h1>
            <p className="text-muted-foreground">
              Seamless settings powered by intelligent automation
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <ProfileHeader />
        
        {/* Focus on automation and smart connections */}
        <SmartConnections />
        
        <AIPreferences />
        
        <ThemeSettings />
        
        <AccountSettings />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
