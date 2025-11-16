import {
  Briefcase,
  ArrowDownCircle,
  Gift,
  MoreHorizontal,
  ShoppingBag,
  Utensils,
  Car,
  Zap,
  Film,
  Heart,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

/**
 * Centralized category icon and color configuration
 * Ensures consistent iconography across Dashboard, Money In, and Money Out pages
 */

// Income category icons
export const incomeCategoryIcons: Record<string, LucideIcon> = {
  salary: Briefcase,
  freelance: ArrowDownCircle,
  gift: Gift,
  other_income: MoreHorizontal,
};

// Expense category icons
export const expenseCategoryIcons: Record<string, LucideIcon> = {
  groceries: ShoppingBag,
  dining: Utensils,
  transport: Car,
  utilities: Zap,
  entertainment: Film,
  shopping: ShoppingBag,
  health: Heart,
  education: GraduationCap,
  other_expense: MoreHorizontal,
};

// Combined category icons (all categories)
export const categoryIcons: Record<string, LucideIcon> = {
  ...incomeCategoryIcons,
  ...expenseCategoryIcons,
};

// Category background colors with dark mode support
export const categoryColors: Record<string, string> = {
  // Income categories
  salary: "bg-primary/10 text-primary",
  freelance: "bg-success/10 text-success",
  gift: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  other_income: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",

  // Expense categories
  groceries: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  dining: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  transport: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  utilities: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  entertainment: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  shopping: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  health: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  education: "bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  other_expense: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
};

/**
 * Get icon component for a category
 * Falls back to MoreHorizontal for unknown categories
 */
export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] || MoreHorizontal;
}

/**
 * Get color class for a category
 * Falls back to gray for unknown categories
 */
export function getCategoryColor(category: string): string {
  return categoryColors[category] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
}

// Type exports for TypeScript safety
export type IncomeCategory = keyof typeof incomeCategoryIcons;
export type ExpenseCategory = keyof typeof expenseCategoryIcons;
export type Category = keyof typeof categoryIcons;
