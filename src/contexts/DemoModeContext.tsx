import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

interface DemoModeContextValue {
  isDemoMode: boolean;
  enterDemoMode: () => void;
  exitDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextValue | undefined>(undefined);

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error("useDemoMode must be used within DemoModeProvider");
  }
  return context;
};

interface DemoModeProviderProps {
  children: ReactNode;
}

const DEMO_MODE_KEY = "financeflow_demo_mode";

/**
 * DemoModeProvider - Manages demo mode state globally
 * Persists demo mode preference to localStorage
 */
export const DemoModeProvider = ({ children }: DemoModeProviderProps) => {
  // Check localStorage on init
  const [isDemoMode, setIsDemoMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(DEMO_MODE_KEY) === "true";
    }
    return false;
  });

  // Persist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDemoMode) {
        localStorage.setItem(DEMO_MODE_KEY, "true");
      } else {
        localStorage.removeItem(DEMO_MODE_KEY);
      }
    }
  }, [isDemoMode]);

  const enterDemoMode = useCallback(() => {
    setIsDemoMode(true);
  }, []);

  const exitDemoMode = useCallback(() => {
    setIsDemoMode(false);
  }, []);

  const value: DemoModeContextValue = {
    isDemoMode,
    enterDemoMode,
    exitDemoMode,
  };

  return <DemoModeContext.Provider value={value}>{children}</DemoModeContext.Provider>;
};
