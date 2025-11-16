import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";
import { toast } from "sonner";

/**
 * DemoDataSeeder - Component to populate the database with realistic demo transactions
 * This is used for testing/demo purposes to showcase the Reports functionality
 */
export const DemoDataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const seedDemoData = async () => {
    setIsSeeding(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in to seed demo data");
        return;
      }

      // Call the seed function from the database
      const { error } = await supabase.rpc('seed_demo_transactions', {
        target_user_id: user.id
      });

      if (error) {
        console.error("Error seeding demo data:", error);
        toast.error("Failed to seed demo data. The seed function may not be available.");
      } else {
        toast.success("Demo data seeded successfully!", {
          description: "Check your Reports page to see realistic transaction data."
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while seeding demo data");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="border-warning/30 bg-gradient-to-br from-warning/10 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AppIcons.analytics.ai className="h-5 w-5 text-warning" />
          Demo Data Seeder
        </CardTitle>
        <CardDescription>
          Populate your account with realistic sample transactions for testing the Reports page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-xl space-y-2">
          <p className="text-sm text-muted-foreground">
            This will add 4 months of realistic transaction data including:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Income from salary, freelance work, and other sources</li>
            <li>• Expenses across all categories (groceries, dining, transport, etc.)</li>
            <li>• Realistic amounts and dates for November, October, September, and August 2024</li>
          </ul>
        </div>

        <Button
          onClick={seedDemoData}
          disabled={isSeeding}
          className="w-full bg-warning hover:bg-warning/90 text-warning-foreground rounded-xl"
        >
          {isSeeding ? (
            <>
              <AppIcons.ui.loading className="mr-2 h-4 w-4 animate-spin" />
              Seeding Demo Data...
            </>
          ) : (
            <>
              <AppIcons.actions.refresh className="mr-2 h-4 w-4" />
              Seed Demo Data
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Note: This is for demo/testing purposes only
        </p>
      </CardContent>
    </Card>
  );
};
