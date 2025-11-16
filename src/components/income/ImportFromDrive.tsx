import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const ImportFromDrive = () => {
  const handleImportClick = () => {
    toast.info("Google Drive import will connect to your account and scan for invoices", {
      description: "AI will automatically extract income data from your documents",
    });
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Primary Import Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Import from Google Drive</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect your Google Drive account and our AI will automatically scan for invoices, 
              extract income data, and organize everything for you. No manual entry needed!
            </p>
            <Button onClick={handleImportClick} className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Connect Google Drive
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-muted/50 p-4 border border-border">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-Powered Features
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Automatic invoice detection in your Drive</li>
            <li>• Smart data extraction (amounts, dates, clients)</li>
            <li>• Review and edit extracted data before importing</li>
            <li>• Bulk import multiple invoices at once</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
