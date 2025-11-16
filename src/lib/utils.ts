import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency with European formatting
 * Uses period (.) as thousands separator and comma (,) as decimal separator
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "1.234,56")
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  // Format with specified decimals
  const fixed = value.toFixed(decimals);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = fixed.split('.');

  // Add thousands separators (period) to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Join with comma as decimal separator
  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
}
