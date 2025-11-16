import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse a date string (YYYY-MM-DD) in a timezone-safe manner
 * Prevents off-by-one errors caused by UTC/local timezone differences
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object in local timezone at midnight
 */
export function parseLocalDate(dateString: string): Date {
  // Split the date string to get year, month, day
  const [year, month, day] = dateString.split('-').map(Number);
  // Create date in local timezone (month is 0-indexed)
  return new Date(year, month - 1, day);
}

/**
 * Format a number as currency with European formatting
 * Uses period (.) as thousands separator and comma (,) as decimal separator
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "1.234,56")
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  // Guard against undefined/null/NaN values
  if (value === undefined || value === null || isNaN(value)) {
    return (0).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(/\./g, ',');
  }

  // Format with specified decimals
  const fixed = value.toFixed(decimals);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = fixed.split('.');

  // Add thousands separators (period) to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Join with comma as decimal separator
  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
}

/**
 * Wraps a promise with a timeout
 * Throws an error if the promise doesn't resolve within the specified time
 * @param promise - The promise to wrap
 * @param timeoutMs - Timeout in milliseconds (default: 30000 = 30 seconds)
 * @param errorMessage - Custom error message
 * @returns Promise that rejects if timeout is reached
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 30000,
  errorMessage: string = "Operation timed out. Please check your connection and try again."
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ]);
}
