import { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { BottomNav } from "./BottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      <DashboardHeader />
      <main className="px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
