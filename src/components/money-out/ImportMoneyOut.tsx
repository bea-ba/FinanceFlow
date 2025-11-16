import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Sparkles, Mail, Camera } from "lucide-react";
import { toast } from "sonner";

export const ImportMoneyOut = () => {
  const handleDriveImport = () => {
    toast.info("Google Drive import will connect to your account and scan for bills", {
      description: "AI will automatically extract bill data from your documents",
    });
  };

  const handleEmailImport = () => {
    toast.info("Email import will connect to scan for bill notifications", {
      description: "AI will automatically detect and extract bill information from emails",
    });
  };

  const handlePhotoUpload = () => {
    toast.info("Photo upload coming soon", {
      description: "Upload a photo of any bill and AI will extract all the details",
    });
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Automatic Import Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Drive Import */}
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Import from Google Drive</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect your Google Drive account and our AI will automatically scan for bills, 
              extract payment data, and organize everything for you. No manual entry needed!
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
            <h3 className="font-semibold mb-1">Import from Email</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect your email and let AI scan for bill notifications, payment confirmations, 
              and recurring charges. Automatic detection of due dates and amounts.
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
            <h3 className="font-semibold mb-1">Upload Bill Photo</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Snap a photo of any bill, receipt, or invoice. AI will read and extract all details 
              including amounts, due dates, and merchant information.
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
            AI-Powered Features
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Automatic bill detection across all sources</li>
            <li>• Smart data extraction (amounts, dates, vendors)</li>
            <li>• Duplicate detection and anomaly alerts</li>
            <li>• Review and edit extracted data before importing</li>
            <li>• Bulk import multiple bills at once</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
