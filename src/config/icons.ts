import {
  // Navigation
  Home,
  Plus,
  Minus,
  Sparkles,
  User,
  
  // Financial
  Wallet,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  TrendingDown,
  
  // Charts & Analytics
  PieChart,
  Activity,
  Target,
  Brain,
  
  // Actions
  Search,
  Pencil,
  Trash2,
  Download,
  FileText,
  FileSpreadsheet,
  File,
  
  // Communication
  Bell,
  Mail,
  
  // Time
  Calendar,
  CalendarRange,
  CalendarIcon,
  
  // Status
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  
  // UI
  ArrowLeft,
  Loader2,
  Lock,
  LogOut,
  Shield,
  Moon,
  Sun,
  Monitor,
  Zap,
  Link2,
  Repeat,
  Camera,
  ArrowUpDown,
  
  type LucideIcon,
} from "lucide-react";

/**
 * Centralized icon configuration for the app
 * This ensures consistent iconography across all pages
 */
export const AppIcons = {
  // Navigation icons
  navigation: {
    home: Home,
    moneyIn: Plus,
    moneyOut: Minus,
    insights: Sparkles,
    profile: User,
  },
  
  // Financial icons
  financial: {
    balance: Wallet,
    money: DollarSign,
    income: Plus,
    expense: Minus,
    incomeAlt: ArrowDownCircle,
    expenseAlt: ArrowUpCircle,
    trendingUp: TrendingUp,
    trendingDown: TrendingDown,
  },
  
  // Analytics & Charts
  analytics: {
    pieChart: PieChart,
    activity: Activity,
    target: Target,
    ai: Sparkles,
    brain: Brain,
  },
  
  // Actions
  actions: {
    add: Plus,
    search: Search,
    edit: Pencil,
    delete: Trash2,
    download: Download,
    export: Download,
  },
  
  // Files
  files: {
    document: FileText,
    spreadsheet: FileSpreadsheet,
    generic: File,
  },
  
  // Communication
  communication: {
    notification: Bell,
    email: Mail,
  },
  
  // Time & Calendar
  time: {
    calendar: Calendar,
    calendarRange: CalendarRange,
    calendarIcon: CalendarIcon,
  },
  
  // Status & Feedback
  status: {
    success: CheckCircle,
    successAlt: CheckCircle2,
    warning: AlertCircle,
    alert: AlertCircle,
    idea: Lightbulb,
  },
  
  // UI Elements
  ui: {
    back: ArrowLeft,
    loading: Loader2,
    lock: Lock,
    logout: LogOut,
    security: Shield,
    darkMode: Moon,
    lightMode: Sun,
    systemMode: Monitor,
    power: Zap,
    link: Link2,
    repeat: Repeat,
    camera: Camera,
    sort: ArrowUpDown,
  },
} as const;

// Type helpers for type safety
export type AppIconCategory = keyof typeof AppIcons;
export type NavigationIcon = keyof typeof AppIcons.navigation;
export type FinancialIcon = keyof typeof AppIcons.financial;
export type AnalyticsIcon = keyof typeof AppIcons.analytics;
export type ActionIcon = keyof typeof AppIcons.actions;

/**
 * Helper function to get an icon from the centralized config
 * @param category - The category of the icon
 * @param name - The name of the icon within the category
 * @returns The Lucide icon component
 */
export function getAppIcon(
  category: AppIconCategory,
  name: string
): LucideIcon {
  return (AppIcons[category] as any)[name] || AppIcons.ui.loading;
}

/**
 * Navigation items configuration with icons
 */
export const navItems = [
  { icon: AppIcons.navigation.home, label: "Home", path: "/" },
  { icon: AppIcons.navigation.moneyIn, label: "Money In", path: "/income" },
  { icon: AppIcons.navigation.moneyOut, label: "Money Out", path: "/money-out" },
  { icon: AppIcons.navigation.insights, label: "Insights", path: "/reports" },
  { icon: AppIcons.navigation.profile, label: "Profile", path: "/profile" },
] as const;
