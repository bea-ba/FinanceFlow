import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Link2, Sparkles, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";

const connections = [
  {
    id: "bank-sync",
    name: "Bank Auto-Sync",
    description: "Automatically imports transactions",
    status: "connected",
    icon: CheckCircle2,
    color: "text-green-500"
  },
  {
    id: "ai-categorization",
    name: "AI Categorization",
    description: "Intelligently categorizes spending",
    status: "active",
    icon: Sparkles,
    color: "text-primary"
  },
  {
    id: "smart-alerts",
    name: "Smart Alerts",
    description: "AI-powered spending insights",
    status: "active",
    icon: Zap,
    color: "text-primary"
  }
];

const availableConnections = [
  { name: "Google Drive", description: "Import receipts automatically" },
  { name: "Email Scanner", description: "Detect bills from inbox" },
  { name: "Calendar Sync", description: "Bill reminders on calendar" }
];

export const SmartConnections = () => {
  const handleConnect = (name: string) => {
    toast.success(`${name} connection started!`, {
      description: "Setting up automatic sync..."
    });
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-primary" />
          Smart Connections
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Automatic integrations that keep your finances flowing
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Connections */}
        <div className="space-y-3">
          {connections.map((conn) => {
            const Icon = conn.icon;
            return (
              <div
                key={conn.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Icon className={`h-5 w-5 ${conn.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{conn.name}</p>
                    <p className="text-sm text-muted-foreground">{conn.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500/50 text-green-600">
                  {conn.status}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Available Connections */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Add more connections</h4>
          <div className="space-y-2">
            {availableConnections.map((conn) => (
              <div
                key={conn.name}
                className="flex items-center justify-between p-3 rounded-lg border border-dashed border-border hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{conn.name}</p>
                  <p className="text-xs text-muted-foreground">{conn.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleConnect(conn.name)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
