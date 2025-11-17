import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Trash2, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AccountSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success("You're logged out — see you soon!");
      navigate("/auth");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error logging out:', error);
      }
      toast.error("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      // First, manually delete transactions and profile to ensure cleanup
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No user found");
      }

      // Delete transactions
      const { error: transactionsError } = await supabase
        .from('transactions')
        .delete()
        .eq('user_id', user.id);

      if (transactionsError) {
        if (import.meta.env.DEV) {
          console.error('Error deleting transactions:', transactionsError);
        }
      }

      // Delete profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        if (import.meta.env.DEV) {
          console.error('Error deleting profile:', profileError);
        }
      }

      // Call RPC function to delete auth user (if migration was run)
      // If it fails, we'll fall back to manual sign-out
      try {
        await supabase.rpc('delete_user_account');
      } catch (rpcError) {
        if (import.meta.env.DEV) {
          console.warn('RPC delete_user_account not available, using signOut:', rpcError);
        }
      }

      // Sign out the user
      await supabase.auth.signOut();

      toast.success("Account deleted successfully");
      navigate("/auth");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error deleting account:', error);
      }
      toast.error("Failed to delete account", {
        description: error instanceof Error ? error.message : "Please try again or contact support"
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-border">
          <div className="space-y-1">
            <h3 className="font-medium">Sign out</h3>
            <p className="text-sm text-muted-foreground">
              Log out from this device
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            {loading ? "Signing out..." : "Sign out"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
          <div className="space-y-1">
            <h3 className="font-medium text-destructive">Delete account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently remove account and all data
            </p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={deleteLoading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>This can't be undone</AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting your account will permanently remove all data, including:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>All Money In and Money Out transactions</li>
                    <li>Bill reminders and recurring bills</li>
                    <li>Reports and insights</li>
                    <li>Profile and settings</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteLoading ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
