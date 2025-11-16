import { z } from "zod";

/**
 * Centralized validation schemas using Zod
 * Ensures consistent, type-safe validation across all forms
 */

// Income categories
export const incomeCategories = ["salary", "freelance", "gift", "other_income"] as const;

// Expense categories
export const expenseCategories = [
  "groceries",
  "dining",
  "transport",
  "utilities",
  "entertainment",
  "shopping",
  "health",
  "education",
  "other_expense",
] as const;

// Bill frequencies
export const billFrequencies = ["monthly", "weekly", "yearly", "quarterly"] as const;

// Bill statuses
export const billStatuses = ["paid", "unpaid", "overdue"] as const;

/**
 * Transaction validation schema
 * Used for both income and expense forms
 */
export const transactionSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than €0")
    .min(0.01, "Amount must be at least €0.01")
    .max(1000000, "Amount cannot exceed €1,000,000")
    .refine((val) => !isNaN(val), "Amount must be a valid number")
    .refine((val) => Number.isFinite(val), "Amount must be a finite number"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
  transaction_date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, "Invalid date format"),
});

/**
 * Income-specific validation schema
 */
export const incomeSchema = transactionSchema.extend({
  category: z.enum(incomeCategories, {
    errorMap: () => ({ message: "Please select a valid income category" }),
  }),
  type: z.literal("income"),
});

/**
 * Expense-specific validation schema
 */
export const expenseSchema = transactionSchema.extend({
  category: z.enum(expenseCategories, {
    errorMap: () => ({ message: "Please select a valid expense category" }),
  }),
  type: z.literal("expense"),
});

/**
 * Bill validation schema
 */
export const billSchema = z.object({
  name: z
    .string()
    .min(1, "Bill name is required")
    .max(100, "Bill name cannot exceed 100 characters"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than €0")
    .min(0.01, "Amount must be at least €0.01")
    .max(100000, "Amount cannot exceed €100,000")
    .refine((val) => !isNaN(val), "Amount must be a valid number")
    .refine((val) => Number.isFinite(val), "Amount must be a finite number"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category name too long"),
  due_day: z
    .number({
      required_error: "Due day is required",
      invalid_type_error: "Due day must be a number",
    })
    .int("Due day must be a whole number")
    .min(1, "Due day must be between 1 and 31")
    .max(31, "Due day must be between 1 and 31"),
  frequency: z.enum(billFrequencies, {
    errorMap: () => ({ message: "Please select a valid frequency" }),
  }),
  status: z.enum(billStatuses, {
    errorMap: () => ({ message: "Please select a valid status" }),
  }).optional(),
  next_due_date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, "Invalid date format").optional(),
});

/**
 * Profile update validation schema
 */
export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  avatar_url: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});

/**
 * Date range validation schema
 */
export const dateRangeSchema = z.object({
  from: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date",
  }),
  to: z.date({
    required_error: "End date is required",
    invalid_type_error: "Invalid end date",
  }),
}).refine((data) => data.from <= data.to, {
  message: "Start date must be before or equal to end date",
  path: ["from"],
});

/**
 * Export validation schema
 */
export const exportSchema = z.object({
  format: z.enum(["csv", "pdf", "json"], {
    errorMap: () => ({ message: "Please select a valid export format" }),
  }),
  dateRange: dateRangeSchema.optional(),
  includeCharts: z.boolean().optional(),
});

// Type exports for TypeScript
export type IncomeData = z.infer<typeof incomeSchema>;
export type ExpenseData = z.infer<typeof expenseSchema>;
export type BillData = z.infer<typeof billSchema>;
export type ProfileData = z.infer<typeof profileSchema>;
export type DateRangeData = z.infer<typeof dateRangeSchema>;
export type ExportData = z.infer<typeof exportSchema>;
