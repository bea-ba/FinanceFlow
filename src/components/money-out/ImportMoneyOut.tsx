import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, FileText, Sparkles, Mail, Camera } from "lucide-react";
import { toast } from "sonner";
import { LockedFeature } from "@/components/profile/LockedFeature";
import { PremiumBadge } from "@/components/profile/PremiumBadge";

export const ImportMoneyOut = () => {
  const handleDriveImport = () => {
    toast.info("Connecting to Google Drive", {
      description: "We'll scan for bills and extract everything automatically",
    });
  };

  const handleEmailImport = () => {
    toast.info("Connecting to email", {
      description: "We'll find bill notifications and extract the details",
    });
  };

  const handlePhotoUpload = () => {
    toast.info("Snap a photo of any bill", {
      description: "We'll read it and pull out all the important details",
    });
  };

  return (
    <LockedFeature 
      tooltipText="Unlock Unlimited Imports with Premium"
      featureName="Unlimited Bill Imports"
      showOverlay={false}
      badgePosition="top-right"
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Easiest way to track expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Drive Import */}
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <ArrowUpCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Connect Google Drive</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Link Google Drive and we'll automatically find your bills, 
                read all the details, and keep everything organized. Zero manual work!
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Button onClick={handleDriveImport} className="flex-1 sm:flex-none" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  Connect Google Drive
                </Button>
                <PremiumBadge />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Free: 20/month • Premium: Unlimited
              </p>
            </div>
          </div>

          {/* Email Import */}
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-secondary/10 p-3">
              <Mail className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Connect email</h3>
              <p className="text-sm text-muted-foreground mb-3">
                We'll scan for bill notifications, payment confirmations, 
                and recurring charges. Due dates and amounts detected automatically.
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Button onClick={handleEmailImport} variant="secondary" className="flex-1 sm:flex-none" disabled>
                  <Mail className="mr-2 h-4 w-4" />
                  Connect Email
                </Button>
                <PremiumBadge />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Free: 10/month • Premium: Unlimited
              </p>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-accent/10 p-3">
              <Camera className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Upload a bill photo</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Snap a photo of any bill, receipt, or invoice. We'll read it and extract 
                all the details — amounts, due dates, and who it's from.
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <Button onClick={handlePhotoUpload} variant="outline" className="flex-1 sm:flex-none" disabled>
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <PremiumBadge />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Free: 10/month • Premium: Unlimited
              </p>
            </div>
          </div>
          
          {/* AI Features */}
          <div className="rounded-lg bg-muted/50 p-4 border border-border">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              What happens automatically
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Finds bills across all your sources</li>
              <li>• Reads amounts, dates, and vendors</li>
              <li>• Catches duplicates and unusual charges</li>
              <li>• Shows you everything before it's added</li>
              <li>• Imports multiple bills in one go</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </LockedFeature>
  );
};
