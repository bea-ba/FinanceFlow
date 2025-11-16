import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";
import { Badge } from "@/components/ui/badge";
import { LockedFeature } from "@/components/profile/LockedFeature";

export const AIInsights = () => {
  const insights = [
    {
      type: "opportunity",
      icon: AppIcons.financial.trendingUp,
      title: "Savings opportunity detected",
      description: "Your spending on dining is 23% higher this month. Small adjustments could save €200.",
      confidence: "high",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      type: "pattern",
      icon: AppIcons.status.idea,
      title: "Pattern noticed",
      description: "Your grocery spending peaks mid-month. Consider weekly shopping to smooth out the flow.",
      confidence: "medium",
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      type: "alert",
      icon: AppIcons.status.alert,
      title: "Unusual activity",
      description: "Your entertainment spending is 45% higher than usual. Keep an eye on subscriptions.",
      confidence: "high",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <LockedFeature 
      tooltipText="Unlock Advanced AI Insights with Premium"
      featureName="Advanced AI Insights"
      showOverlay={true}
    >
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <AppIcons.analytics.ai className="h-5 w-5 text-primary" />
            </div>
            AI Insights
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Smart observations about my financial flow
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="group relative p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <div className={`${insight.bgColor} ${insight.color} p-2.5 rounded-lg h-fit`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        {insight.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {insight.confidence === "high" ? "High confidence" : "Medium confidence"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
          
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <AppIcons.analytics.ai className="h-3.5 w-3.5 text-primary" />
              Insights update automatically as your spending patterns change
            </p>
          </div>
        </CardContent>
      </Card>
    </LockedFeature>
  );
};