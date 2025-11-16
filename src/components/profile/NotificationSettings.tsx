import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppIcons } from "@/config/icons";
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
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      toast.success(`${label} ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, [key]: newValue };
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AppIcons.communication.notification className="h-5 w-5 text-primary" />
          Notifications
        </CardTitle>
        <CardDescription>
          Choose when and how you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Alerts */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AppIcons.financial.euro className="h-4 w-4 text-primary" />
            Financial Alerts
          </h3>

          <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="bill-reminders" className="font-medium">Remind about bills</Label>
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

          <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="income-alerts" className="font-medium">Notify about new income</Label>
              <p className="text-sm text-muted-foreground">
                Get a heads up when income detected
              </p>
            </div>
            <Switch
              id="income-alerts"
              checked={notifications.incomeAlerts}
              onCheckedChange={() => handleToggle('incomeAlerts')}
            />
          </div>

          <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="budget-alerts" className="font-medium">Alert about spending</Label>
              <p className="text-sm text-muted-foreground">
                Friendly nudges when getting close to limits
              </p>
            </div>
            <Switch
              id="budget-alerts"
              checked={notifications.budgetAlerts}
              onCheckedChange={() => handleToggle('budgetAlerts')}
            />
          </div>
        </div>

        {/* Reports */}
        <div className="pt-4 border-t space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AppIcons.analytics.activity className="h-4 w-4 text-primary" />
            Reports & Summaries
          </h3>

          <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="weekly-reports" className="font-medium">Send weekly summaries</Label>
              <p className="text-sm text-muted-foreground">
                Your weekly check-in on financial flow
              </p>
            </div>
            <Switch
              id="weekly-reports"
              checked={notifications.weeklyReports}
              onCheckedChange={() => handleToggle('weeklyReports')}
            />
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="pt-4 border-t space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AppIcons.communication.mail className="h-4 w-4 text-primary" />
            How to reach you
          </h3>

          <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="email-notif" className="font-medium">Email</Label>
              <p className="text-sm text-muted-foreground">
                Send notifications to email
              </p>
            </div>
            <Switch
              id="email-notif"
              checked={notifications.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="space-y-0.5 flex-1">
              <Label htmlFor="push-notif" className="font-medium">Push notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get push alerts on phone
              </p>
            </div>
            <Switch
              id="push-notif"
              checked={notifications.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 p-4 rounded-xl bg-blue-tint border border-info/20">
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <AppIcons.status.idea className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
            <span>
              You can change these settings anytime. We'll only notify you about things that matter to your financial wellness.
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
