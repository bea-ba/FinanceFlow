import { AppIcons, type AppIconCategory } from "@/config/icons";
import type { LucideIcon } from "lucide-react";

/**
 * Hook to access app icons with type safety
 * @returns Object containing all icon categories and a getter function
 */
export function useAppIcon() {
  /**
   * Get an icon from a specific category
   * @param category - The category of the icon
   * @param name - The name of the icon within the category
   * @returns The Lucide icon component
   */
  const getIcon = (category: AppIconCategory, name: string): LucideIcon => {
    const categoryIcons = AppIcons[category] as Record<string, LucideIcon>;
    return categoryIcons[name] || AppIcons.ui.loading;
  };

  return {
    icons: AppIcons,
    getIcon,
  };
}
