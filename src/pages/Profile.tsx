import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { NotificationSettings } from "@/components/profile/NotificationSettings";
import { ThemeSettings } from "@/components/profile/ThemeSettings";
import { AccountSettings } from "@/components/profile/AccountSettings";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">Your profile</h1>
        
        <ProfileHeader />
        
        <ProfileSettings />
        
        <NotificationSettings />
        
        <ThemeSettings />
        
        <AccountSettings />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
