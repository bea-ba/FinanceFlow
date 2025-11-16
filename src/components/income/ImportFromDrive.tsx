import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { LockedFeature } from "@/components/profile/LockedFeature";
import { PremiumBadge } from "@/components/profile/PremiumBadge";

export const ImportFromDrive = () => {
  const handleImportClick = () => {
    toast.info("Connecting to Google Drive", {
      description: "We'll scan for invoices and extract your income data automatically",
    });
  };

  return (
    <LockedFeature 
      tooltipText="Unlock Unlimited Google Drive Imports with Premium"
      showOverlay={false}
      badgePosition="top-right"
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Easiest Way to Track Income
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <ArrowDownCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Connect Google Drive</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Link Google Drive and we'll find your invoices automatically. Our AI reads them, 
                pulls out the important stuff, and keeps everything organized. Zero manual work!
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Button onClick={handleImportClick} className="flex-1 sm:flex-none" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  Connect Google Drive
                </Button>
                <PremiumBadge />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Free tier: 20 imports/month • Premium: Unlimited
              </p>
            </div>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-4 border border-border">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              What happens automatically
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Finds all invoices in your Drive</li>
              <li>• Reads amounts, dates, and client names</li>
              <li>• Shows you everything before it's added</li>
              <li>• Imports multiple invoices in one go</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </LockedFeature>
  );
};
