import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Sparkles, Mail, Camera } from "lucide-react";
import { toast } from "sonner";

export const ImportMoneyOut = () => {
  const handleDriveImport = () => {
    toast.info("Let's connect to your Google Drive", {
      description: "We'll scan for bills and extract everything automatically",
    });
  };

  const handleEmailImport = () => {
    toast.info("Let's connect to your email", {
      description: "We'll find bill notifications and extract the details for you",
    });
  };

  const handlePhotoUpload = () => {
    toast.info("Snap a photo of any bill", {
      description: "We'll read it and pull out all the important details",
    });
  };

  return (
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
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Connect Google Drive</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Link your Google Drive and we'll automatically find your bills, 
              read all the details, and keep everything organized. Zero manual work!
            </p>
            <Button onClick={handleDriveImport} className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Connect Google Drive
            </Button>
          </div>
        </div>

        {/* Email Import */}
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-secondary/10 p-3">
            <Mail className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Connect your email</h3>
            <p className="text-sm text-muted-foreground mb-3">
              We'll scan for bill notifications, payment confirmations, 
              and recurring charges. Due dates and amounts detected automatically.
            </p>
            <Button onClick={handleEmailImport} variant="secondary" className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" />
              Connect Email
            </Button>
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
            <Button onClick={handlePhotoUpload} variant="outline" className="w-full sm:w-auto">
              <Camera className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
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
  );
};
