import { AppIcons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";

export const QuickActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button (FAB) - PRD Spec */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300 hover:scale-110 z-40"
        size="icon"
        aria-label="Add transaction"
      >
        <AppIcons.actions.add className="h-6 w-6 sm:h-7 sm:w-7" />
      </Button>

      <AddTransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};
