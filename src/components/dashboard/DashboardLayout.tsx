import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { BottomNav } from "./BottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      {isHomePage && <DashboardHeader />}
      <main className="px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
