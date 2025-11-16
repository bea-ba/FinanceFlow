import { describe, it, expect } from 'vitest';
import {
  incomeSchema,
  expenseSchema,
  billSchema,
  profileSchema,
  dateRangeSchema,
  exportSchema,
} from '../validationSchemas';

describe('Validation Schemas', () => {
  describe('incomeSchema', () => {
    it('should validate valid income data', () => {
      const validIncome = {
        type: 'income' as const,
        category: 'salary' as const,
        amount: 2500.50,
        description: 'Monthly salary',
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(validIncome);
      expect(result.success).toBe(true);
    });

    it('should reject invalid income category', () => {
      const invalidIncome = {
        type: 'income' as const,
        category: 'groceries',
        amount: 100,
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(invalidIncome);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid income category');
      }
    });

    it('should reject negative amount', () => {
      const invalidIncome = {
        type: 'income' as const,
        category: 'salary' as const,
        amount: -100,
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(invalidIncome);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('greater than');
      }
    });

    it('should reject amount of zero', () => {
      const invalidIncome = {
        type: 'income' as const,
        category: 'salary' as const,
        amount: 0,
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(invalidIncome);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('greater than');
      }
    });

    it('should reject amount exceeding maximum', () => {
      const invalidIncome = {
        type: 'income' as const,
        category: 'salary' as const,
        amount: 1000001,
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(invalidIncome);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('1,000,000');
      }
    });

    it('should accept optional description', () => {
      const validIncome = {
        type: 'income' as const,
        category: 'freelance' as const,
        amount: 500,
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(validIncome);
      expect(result.success).toBe(true);
    });

    it('should reject description exceeding 500 characters', () => {
      const invalidIncome = {
        type: 'income' as const,
        category: 'salary' as const,
        amount: 100,
        description: 'a'.repeat(501),
        transaction_date: '2025-11-15',
      };

      const result = incomeSchema.safeParse(invalidIncome);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('500');
      }
    });

    it('should reject invalid date format', () => {
      const invalidIncome = {
        type: 'income' as const,
        category: 'salary' as const,
        amount: 100,
        transaction_date: 'invalid-date',
      };

      const result = incomeSchema.safeParse(invalidIncome);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('date');
      }
    });
  });

  describe('expenseSchema', () => {
    it('should validate valid expense data', () => {
      const validExpense = {
        type: 'expense' as const,
        category: 'groceries' as const,
        amount: 45.99,
        description: 'Weekly shopping',
        transaction_date: '2025-11-15',
      };

      const result = expenseSchema.safeParse(validExpense);
      expect(result.success).toBe(true);
    });

    it('should reject invalid expense category', () => {
      const invalidExpense = {
        type: 'expense' as const,
        category: 'salary',
        amount: 100,
        transaction_date: '2025-11-15',
      };

      const result = expenseSchema.safeParse(invalidExpense);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid expense category');
      }
    });

    it('should validate all expense categories', () => {
      const categories = ['groceries', 'dining', 'transport', 'utilities', 'entertainment', 'shopping', 'health', 'education', 'other_expense'];

      categories.forEach((category) => {
        const expense = {
          type: 'expense' as const,
          category: category as any,
          amount: 50,
          transaction_date: '2025-11-15',
        };

        const result = expenseSchema.safeParse(expense);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('billSchema', () => {
    it('should validate valid bill data', () => {
      const validBill = {
        name: 'Electricity Bill',
        amount: 150.00,
        category: 'utilities',
        due_day: 15,
        frequency: 'monthly' as const,
        status: 'unpaid' as const,
        next_due_date: '2025-12-15',
      };

      const result = billSchema.safeParse(validBill);
      expect(result.success).toBe(true);
    });

    it('should reject empty bill name', () => {
      const invalidBill = {
        name: '',
        amount: 100,
        category: 'utilities',
        due_day: 15,
        frequency: 'monthly' as const,
      };

      const result = billSchema.safeParse(invalidBill);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('required');
      }
    });

    it('should reject bill name exceeding 100 characters', () => {
      const invalidBill = {
        name: 'a'.repeat(101),
        amount: 100,
        category: 'utilities',
        due_day: 15,
        frequency: 'monthly' as const,
      };

      const result = billSchema.safeParse(invalidBill);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('100');
      }
    });

    it('should reject due_day less than 1', () => {
      const invalidBill = {
        name: 'Test Bill',
        amount: 100,
        category: 'utilities',
        due_day: 0,
        frequency: 'monthly' as const,
      };

      const result = billSchema.safeParse(invalidBill);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('1');
      }
    });

    it('should reject due_day greater than 31', () => {
      const invalidBill = {
        name: 'Test Bill',
        amount: 100,
        category: 'utilities',
        due_day: 32,
        frequency: 'monthly' as const,
      };

      const result = billSchema.safeParse(invalidBill);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('31');
      }
    });

    it('should reject non-integer due_day', () => {
      const invalidBill = {
        name: 'Test Bill',
        amount: 100,
        category: 'utilities',
        due_day: 15.5,
        frequency: 'monthly' as const,
      };

      const result = billSchema.safeParse(invalidBill);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('whole');
      }
    });

    it('should validate all bill frequencies', () => {
      const frequencies = ['monthly', 'weekly', 'yearly', 'quarterly'];

      frequencies.forEach((frequency) => {
        const bill = {
          name: 'Test Bill',
          amount: 100,
          category: 'utilities',
          due_day: 15,
          frequency: frequency as any,
        };

        const result = billSchema.safeParse(bill);
        expect(result.success).toBe(true);
      });
    });

    it('should accept optional status and next_due_date', () => {
      const validBill = {
        name: 'Test Bill',
        amount: 100,
        category: 'utilities',
        due_day: 15,
        frequency: 'monthly' as const,
      };

      const result = billSchema.safeParse(validBill);
      expect(result.success).toBe(true);
    });
  });

  describe('profileSchema', () => {
    it('should validate valid profile data', () => {
      const validProfile = {
        full_name: 'John Doe',
        email: 'john@example.com',
        avatar_url: 'https://example.com/avatar.jpg',
      };

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidProfile = {
        email: 'invalid-email',
      };

      const result = profileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('email');
      }
    });

    it('should reject name exceeding 100 characters', () => {
      const invalidProfile = {
        full_name: 'a'.repeat(101),
      };

      const result = profileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('100');
      }
    });

    it('should accept empty avatar_url', () => {
      const validProfile = {
        full_name: 'John Doe',
        avatar_url: '',
      };

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should accept all optional fields', () => {
      const validProfile = {};

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });
  });

  describe('dateRangeSchema', () => {
    it('should validate valid date range', () => {
      const validRange = {
        from: new Date('2025-11-01'),
        to: new Date('2025-11-30'),
      };

      const result = dateRangeSchema.safeParse(validRange);
      expect(result.success).toBe(true);
    });

    it('should accept same start and end date', () => {
      const validRange = {
        from: new Date('2025-11-15'),
        to: new Date('2025-11-15'),
      };

      const result = dateRangeSchema.safeParse(validRange);
      expect(result.success).toBe(true);
    });

    it('should reject end date before start date', () => {
      const invalidRange = {
        from: new Date('2025-11-30'),
        to: new Date('2025-11-01'),
      };

      const result = dateRangeSchema.safeParse(invalidRange);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('before');
      }
    });
  });

  describe('exportSchema', () => {
    it('should validate valid export data with all fields', () => {
      const validExport = {
        format: 'csv' as const,
        dateRange: {
          from: new Date('2025-11-01'),
          to: new Date('2025-11-30'),
        },
        includeCharts: true,
      };

      const result = exportSchema.safeParse(validExport);
      expect(result.success).toBe(true);
    });

    it('should validate all export formats', () => {
      const formats = ['csv', 'pdf', 'json'];

      formats.forEach((format) => {
        const exportData = {
          format: format as any,
        };

        const result = exportSchema.safeParse(exportData);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid format', () => {
      const invalidExport = {
        format: 'xml',
      };

      const result = exportSchema.safeParse(invalidExport);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid export format');
      }
    });

    it('should accept optional dateRange and includeCharts', () => {
      const validExport = {
        format: 'pdf' as const,
      };

      const result = exportSchema.safeParse(validExport);
      expect(result.success).toBe(true);
    });
  });
});
