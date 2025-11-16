import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";
import { Progress } from "@/components/ui/progress";

export const SmartPredictions = () => {
  const predictions = [
    {
      label: "Expected income this month",
      amount: 8950,
      confidence: 95,
      date: "Based on past 6 months"
    },
    {
      label: "Projected expenses",
      amount: 5650,
      confidence: 88,
      date: "Using spending patterns"
    },
    {
      label: "Predicted savings",
      amount: 3300,
      confidence: 82,
      date: "If current trend continues"
    }
  ];

  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-primary/10 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <AppIcons.analytics.brain className="h-5 w-5 text-primary" />
          </div>
          Smart Predictions
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          AI-powered forecasts based on my spending habits
        </p>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        {predictions.map((prediction, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {prediction.label}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <AppIcons.time.calendar className="h-3 w-3" />
                  {prediction.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">
                  ${prediction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {prediction.confidence}% confident
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <Progress value={prediction.confidence} className="h-1.5" />
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <AppIcons.financial.money className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                On track for a great month
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Based on your current patterns, you're projected to save 37% of your income this month — that's above your usual 30% target.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};