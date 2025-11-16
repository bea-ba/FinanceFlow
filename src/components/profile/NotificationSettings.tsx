import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import { toast } from "sonner";

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    billReminders: true,
    incomeAlerts: true,
    weeklyReports: false,
    budgetAlerts: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newValue = !prev[key];
      toast.success(`${key} ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, [key]: newValue };
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="bill-reminders">Remind me about bills</Label>
            <p className="text-sm text-muted-foreground">
              We'll let you know when bills are coming up
            </p>
          </div>
          <Switch
            id="bill-reminders"
            checked={notifications.billReminders}
            onCheckedChange={() => handleToggle('billReminders')}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="income-alerts">Notify me about new income</Label>
            <p className="text-sm text-muted-foreground">
              Get a heads up when income is detected
            </p>
          </div>
          <Switch
            id="income-alerts"
            checked={notifications.incomeAlerts}
            onCheckedChange={() => handleToggle('incomeAlerts')}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="weekly-reports">Send me weekly summaries</Label>
            <p className="text-sm text-muted-foreground">
              A gentle weekly check-in on my flow
            </p>
          </div>
          <Switch
            id="weekly-reports"
            checked={notifications.weeklyReports}
            onCheckedChange={() => handleToggle('weeklyReports')}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="budget-alerts">Alert me about spending</Label>
            <p className="text-sm text-muted-foreground">
              A friendly nudge when you're getting close to limits
            </p>
          </div>
          <Switch
            id="budget-alerts"
            checked={notifications.budgetAlerts}
            onCheckedChange={() => handleToggle('budgetAlerts')}
          />
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-4">How to reach you</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="email-notif">Email</Label>
              <p className="text-sm text-muted-foreground">
                Send notifications to my email
              </p>
            </div>
            <Switch
              id="email-notif"
              checked={notifications.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="push-notif">Push notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get push alerts on my phone
              </p>
            </div>
            <Switch
              id="push-notif"
              checked={notifications.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
