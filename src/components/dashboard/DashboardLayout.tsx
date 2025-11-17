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
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ paddingBottom: 'var(--bottom-nav-height)' }}>
      {isHomePage && <DashboardHeader />}
      <main className={`px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${isHomePage ? 'pt-6' : 'pt-4'}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
