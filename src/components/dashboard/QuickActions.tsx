import { AppIcons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";

interface QuickActionsProps {
  onTransactionAdded?: () => void;
}

export const QuickActions = ({ onTransactionAdded }: QuickActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-slate-900 shadow-lg z-40"
        size="icon"
      >
        <AppIcons.actions.add className="h-6 w-6" />
      </Button>

      <AddTransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={onTransactionAdded}
      />
    </>
  );
};
