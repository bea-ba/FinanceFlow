import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const AIPreferences = () => {
  const [aiSettings, setAiSettings] = useState({
    autoInsights: true,
    smartPredictions: true,
    spendingAlerts: true,
    savingsSuggestions: true
  });

  const [insightFrequency, setInsightFrequency] = useState([3]);

  const handleToggle = (key: keyof typeof aiSettings) => {
    setAiSettings(prev => {
      const newValue = !prev[key];
      toast.success(`AI ${key} ${newValue ? 'enabled' : 'disabled'}`);
      return { ...prev, [key]: newValue };
    });
  };

  const frequencyLabels = ["Daily", "Few times/week", "Weekly", "Bi-weekly", "Monthly"];

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Intelligence
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Customize how AI helps me manage my flow
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="auto-insights">Auto Insights</Label>
              <p className="text-sm text-muted-foreground">
                AI discovers patterns automatically
              </p>
            </div>
            <Switch
              id="auto-insights"
              checked={aiSettings.autoInsights}
              onCheckedChange={() => handleToggle('autoInsights')}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="smart-predictions">Smart Predictions</Label>
              <p className="text-sm text-muted-foreground">
                Forecast my future spending & income
              </p>
            </div>
            <Switch
              id="smart-predictions"
              checked={aiSettings.smartPredictions}
              onCheckedChange={() => handleToggle('smartPredictions')}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="spending-alerts">Spending Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Gentle nudges when unusual activity is detected
              </p>
            </div>
            <Switch
              id="spending-alerts"
              checked={aiSettings.spendingAlerts}
              onCheckedChange={() => handleToggle('spendingAlerts')}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="savings-suggestions">Savings Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                AI finds opportunities to save more
              </p>
            </div>
            <Switch
              id="savings-suggestions"
              checked={aiSettings.savingsSuggestions}
              onCheckedChange={() => handleToggle('savingsSuggestions')}
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="space-y-2">
            <Label>Insight Frequency</Label>
            <p className="text-sm text-muted-foreground">
              How often AI should check in: {frequencyLabels[insightFrequency[0]]}
            </p>
            <Slider
              value={insightFrequency}
              onValueChange={setInsightFrequency}
              max={4}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
