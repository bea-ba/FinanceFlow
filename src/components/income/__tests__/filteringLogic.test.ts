import { describe, it, expect } from 'vitest';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, startOfDay, endOfDay } from 'date-fns';

/**
 * Tests for transaction filtering logic
 * Covers: search, category, amount range, and date range filters
 */

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string | null;
  transaction_date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'salary',
    amount: 2500.00,
    description: 'Monthly salary payment',
    transaction_date: '2025-11-15',
  },
  {
    id: '2',
    type: 'income',
    category: 'freelance',
    amount: 500.00,
    description: 'Website design project',
    transaction_date: '2025-11-10',
  },
  {
    id: '3',
    type: 'income',
    category: 'salary',
    amount: 2500.00,
    description: 'Monthly salary payment',
    transaction_date: '2025-10-15',
  },
  {
    id: '4',
    type: 'expense',
    category: 'groceries',
    amount: 45.99,
    description: 'Weekly shopping at supermarket',
    transaction_date: '2025-11-14',
  },
  {
    id: '5',
    type: 'expense',
    category: 'dining',
    amount: 25.50,
    description: 'Lunch with colleagues',
    transaction_date: '2025-11-13',
  },
];

// Helper function to get date range (matches implementation)
const getDateRange = (filter: string, customStartDate?: string, customEndDate?: string): { start: Date | null; end: Date | null } => {
  const now = new Date();
  switch (filter) {
    case 'today':
      return { start: startOfDay(now), end: endOfDay(now) };
    case 'this-week':
      return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
    case 'this-month':
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case 'last-month':
      const lastMonth = subMonths(now, 1);
      return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) };
    case 'custom':
      return {
        start: customStartDate ? new Date(customStartDate) : null,
        end: customEndDate ? new Date(customEndDate) : null,
      };
    default:
      return { start: null, end: null };
  }
};

describe('Transaction Filtering Logic', () => {
  describe('Category Filter', () => {
    it('should filter by category', () => {
      const filtered = mockTransactions.filter(t => t.category === 'salary');
      expect(filtered).toHaveLength(2);
      expect(filtered.every(t => t.category === 'salary')).toBe(true);
    });

    it('should return all when category is "all"', () => {
      const categoryFilter = 'all';
      const filtered = categoryFilter === 'all'
        ? mockTransactions
        : mockTransactions.filter(t => t.category === categoryFilter);

      expect(filtered).toHaveLength(mockTransactions.length);
    });

    it('should handle non-existent category', () => {
      const filtered = mockTransactions.filter(t => t.category === 'nonexistent');
      expect(filtered).toHaveLength(0);
    });
  });

  describe('Amount Range Filter', () => {
    it('should filter by minimum amount', () => {
      const minAmount = 100;
      const filtered = mockTransactions.filter(t => t.amount >= minAmount);
      expect(filtered).toHaveLength(3);
      expect(filtered.every(t => t.amount >= minAmount)).toBe(true);
    });

    it('should filter by maximum amount', () => {
      const maxAmount = 100;
      const filtered = mockTransactions.filter(t => t.amount <= maxAmount);
      expect(filtered).toHaveLength(2);
      expect(filtered.every(t => t.amount <= maxAmount)).toBe(true);
    });

    it('should filter by amount range (min and max)', () => {
      const minAmount = 50;
      const maxAmount = 1000;
      const filtered = mockTransactions.filter(
        t => t.amount >= minAmount && t.amount <= maxAmount
      );
      expect(filtered).toHaveLength(1); // Only freelance at 500
      expect(filtered.every(t => t.amount >= minAmount && t.amount <= maxAmount)).toBe(true);
    });

    it('should handle empty amount filters', () => {
      const minAmount = '';
      const maxAmount = '';
      const filtered = mockTransactions.filter(t => {
        const min = minAmount ? parseFloat(minAmount) : null;
        const max = maxAmount ? parseFloat(maxAmount) : null;

        if (min !== null && t.amount < min) return false;
        if (max !== null && t.amount > max) return false;
        return true;
      });

      expect(filtered).toHaveLength(mockTransactions.length);
    });

    it('should handle decimal amounts correctly', () => {
      const minAmount = 45.99;
      const filtered = mockTransactions.filter(t => t.amount >= minAmount);
      expect(filtered).toHaveLength(4);
    });
  });

  describe('Search Filter', () => {
    it('should search in description (case insensitive)', () => {
      const searchTerm = 'salary';
      const filtered = mockTransactions.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(filtered).toHaveLength(2);
    });

    it('should search in category', () => {
      const searchTerm = 'dining';
      const filtered = mockTransactions.filter(t =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(filtered).toHaveLength(1);
    });

    it('should handle empty search term', () => {
      const searchTerm = '';
      const filtered = searchTerm
        ? mockTransactions.filter(t =>
            t.description?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : mockTransactions;

      expect(filtered).toHaveLength(mockTransactions.length);
    });

    it('should handle search with no results', () => {
      const searchTerm = 'nonexistent search term xyz';
      const filtered = mockTransactions.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(filtered).toHaveLength(0);
    });

    it('should trim search term', () => {
      const searchTerm = '  salary  ';
      const filtered = mockTransactions.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      expect(filtered).toHaveLength(2);
    });
  });

  describe('Date Range Filter', () => {
    it('should filter by this-month', () => {
      const { start, end } = getDateRange('this-month');

      const filtered = mockTransactions.filter(t => {
        const transactionDate = new Date(t.transaction_date);
        return start && end && transactionDate >= start && transactionDate <= end;
      });

      // Transactions in November 2025
      expect(filtered.length).toBeGreaterThan(0);
    });

    it('should filter by custom date range (both dates)', () => {
      const { start, end } = getDateRange('custom', '2025-11-10', '2025-11-15');

      const filtered = mockTransactions.filter(t => {
        const transactionDate = new Date(t.transaction_date);
        if (start && end) {
          return transactionDate >= start && transactionDate <= end;
        }
        return true;
      });

      // Should include transactions: id 1 (Nov 15), id 2 (Nov 10), id 4 (Nov 14)
      expect(filtered.length).toBeGreaterThanOrEqual(2);
      expect(filtered.every(t => {
        const date = new Date(t.transaction_date);
        return start && end && date >= start && date <= end;
      })).toBe(true);
    });

    it('should filter by custom start date only', () => {
      const { start, end } = getDateRange('custom', '2025-11-14', '');

      const filtered = mockTransactions.filter(t => {
        const transactionDate = new Date(t.transaction_date);
        if (start && !end) {
          return transactionDate >= start;
        }
        return true;
      });

      expect(filtered).toHaveLength(2); // Transactions from Nov 14 onwards
    });

    it('should filter by custom end date only', () => {
      const { start, end } = getDateRange('custom', '', '2025-11-10');

      const filtered = mockTransactions.filter(t => {
        const transactionDate = new Date(t.transaction_date);
        if (!start && end) {
          return transactionDate <= end;
        }
        return true;
      });

      expect(filtered).toHaveLength(2); // Transactions up to Nov 10
    });

    it('should return all transactions when filter is "all"', () => {
      const { start, end } = getDateRange('all');

      expect(start).toBeNull();
      expect(end).toBeNull();

      const filtered = mockTransactions.filter(t => {
        if (!start && !end) return true;
        const transactionDate = new Date(t.transaction_date);
        if (start && end) return transactionDate >= start && transactionDate <= end;
        if (start) return transactionDate >= start;
        if (end) return transactionDate <= end;
        return true;
      });

      expect(filtered).toHaveLength(mockTransactions.length);
    });

    it('should use Monday as week start (weekStartsOn: 1)', () => {
      const now = new Date('2025-11-15'); // Saturday
      const weekStart = startOfWeek(now, { weekStartsOn: 1 });

      // Week should start on Monday Nov 10
      expect(weekStart.getDay()).toBe(1); // 1 = Monday
    });
  });

  describe('Combined Filters', () => {
    it('should apply category and amount filters together', () => {
      const categoryFilter = 'salary';
      const minAmount = 2000;

      const filtered = mockTransactions.filter(t => {
        if (t.category !== categoryFilter) return false;
        if (t.amount < minAmount) return false;
        return true;
      });

      expect(filtered).toHaveLength(2);
      expect(filtered.every(t => t.category === 'salary' && t.amount >= 2000)).toBe(true);
    });

    it('should apply search, category, and amount filters together', () => {
      const searchTerm = 'monthly';
      const categoryFilter = 'salary';
      const minAmount = 2000;

      const filtered = mockTransactions.filter(t => {
        if (!t.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (t.category !== categoryFilter) return false;
        if (t.amount < minAmount) return false;
        return true;
      });

      expect(filtered).toHaveLength(2);
    });

    it('should apply all filters (search, category, amount, date)', () => {
      const searchTerm = 'salary';
      const categoryFilter = 'salary';
      const minAmount = 2000;
      const { start, end } = getDateRange('custom', '2025-11-01', '2025-11-30');

      const filtered = mockTransactions.filter(t => {
        if (!t.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (t.category !== categoryFilter) return false;
        if (t.amount < minAmount) return false;

        const transactionDate = new Date(t.transaction_date);
        if (start && end && (transactionDate < start || transactionDate > end)) return false;

        return true;
      });

      expect(filtered).toHaveLength(1); // Only Nov 2025 salary
    });

    it('should return correct count when no filters match', () => {
      const categoryFilter = 'nonexistent';
      const searchTerm = 'xyz';

      const filtered = mockTransactions.filter(t => {
        if (t.category !== categoryFilter) return false;
        if (!t.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
      });

      expect(filtered).toHaveLength(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle transactions without descriptions', () => {
      const transactionWithoutDesc: Transaction = {
        id: '6',
        type: 'income',
        category: 'gift',
        amount: 100,
        description: null,
        transaction_date: '2025-11-01',
      };

      const testData = [...mockTransactions, transactionWithoutDesc];
      const searchTerm = 'gift';

      const filtered = testData.filter(t =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      expect(filtered).toHaveLength(1);
    });

    it('should handle zero amount', () => {
      const zeroTransaction: Transaction = {
        id: '7',
        type: 'expense',
        category: 'other',
        amount: 0,
        description: 'Zero amount test',
        transaction_date: '2025-11-01',
      };

      const testData = [...mockTransactions, zeroTransaction];
      const minAmount = 0;

      const filtered = testData.filter(t => t.amount >= minAmount);
      expect(filtered).toHaveLength(testData.length);
    });

    it('should handle very large amounts', () => {
      const largeTransaction: Transaction = {
        id: '8',
        type: 'income',
        category: 'other',
        amount: 999999.99,
        description: 'Large amount',
        transaction_date: '2025-11-01',
      };

      const testData = [...mockTransactions, largeTransaction];
      const maxAmount = 1000000;

      const filtered = testData.filter(t => t.amount <= maxAmount);
      expect(filtered).toHaveLength(testData.length);
    });

    it('should handle special characters in search', () => {
      const specialCharTransaction: Transaction = {
        id: '9',
        type: 'expense',
        category: 'other',
        amount: 50,
        description: 'Test & special (characters) [here]',
        transaction_date: '2025-11-01',
      };

      const testData = [...mockTransactions, specialCharTransaction];
      const searchTerm = '(characters)';

      const filtered = testData.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      expect(filtered).toHaveLength(1);
    });
  });
});
