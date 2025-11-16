import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, FileText, Sparkles, Mail, Camera } from "lucide-react";
import { toast } from "sonner";
import { LockedFeature } from "@/components/profile/LockedFeature";
import { PremiumBadge } from "@/components/profile/PremiumBadge";
import { UploadModal } from "@/components/shared/UploadModal";
import { supabase } from "@/integrations/supabase/client";

export const ImportMoneyOut = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

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

  const handleUploadComplete = async (extractedData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to add expenses");
        return;
      }

      // Insert expense from extracted receipt data
      const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        type: 'expense',
        category: extractedData.category || 'other_expense',
        amount: extractedData.amount,
        description: extractedData.merchant || 'Receipt upload',
        transaction_date: extractedData.date || new Date().toISOString().split('T')[0]
      });

      if (error) throw error;

      toast.success("Expense added from receipt!");
      // Refresh the page to show new expense
      window.location.reload();
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error("Failed to add expense from receipt");
    }
  };

  return (
    <>
      <LockedFeature
        tooltipText="Unlock Unlimited Imports with Premium"
        featureName="Unlimited Bill Imports"
        showOverlay={false}
        badgePosition="top-right"
      >
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-card">
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
                  <Button onClick={handleDriveImport} className="flex-1 sm:flex-none rounded-xl" disabled>
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
                  <Button onClick={handleEmailImport} variant="secondary" className="flex-1 sm:flex-none rounded-xl" disabled>
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
                <h3 className="font-semibold mb-1">Upload a receipt photo</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Snap a photo of any bill, receipt, or invoice. We'll read it and extract
                  all the details — amounts, due dates, and who it's from.
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button
                    onClick={() => setShowUploadModal(true)}
                    variant="outline"
                    className="flex-1 sm:flex-none rounded-xl"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Receipt
                  </Button>
                  <span className="text-xs text-success font-medium px-2 py-1 bg-success/10 rounded-full border border-success/20">
                    Try it free!
                  </span>
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

      {/* Upload Modal */}
      <UploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        title="Upload Receipt"
        description="Take or upload a photo of your receipt and we'll extract the details automatically"
        acceptedFileTypes={{
          'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        }}
        onUploadComplete={handleUploadComplete}
      />
    </>
  );
};
