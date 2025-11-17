import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { TransactionsProvider, useTransactions } from '../TransactionsContext';
import { DemoModeProvider } from '../DemoModeContext';
import { supabase } from '@/integrations/supabase/client';
import { mockTransaction, mockUser } from '@/test/utils';
import { ReactNode } from 'react';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      getUser: vi.fn(),
    },
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(),
    })),
    removeChannel: vi.fn(),
  },
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Create wrapper that includes DemoModeProvider
const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <DemoModeProvider>
      <TransactionsProvider>{children}</TransactionsProvider>
    </DemoModeProvider>
  );
};

describe('TransactionsContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default auth mock
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    // Setup default from mock
    const mockOrder = vi.fn().mockResolvedValue({ data: [], error: null });
    const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

    vi.mocked(supabase.from).mockReturnValue({
      select: mockSelect,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useTransactions hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useTransactions());
      }).toThrow('useTransactions must be used within TransactionsProvider');

      console.error = originalError;
    });

    it('should provide context value when used inside provider', () => {
      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.transactions).toBeDefined();
      expect(result.current.addTransaction).toBeDefined();
      expect(result.current.updateTransaction).toBeDefined();
      expect(result.current.deleteTransaction).toBeDefined();
    });
  });

  describe('refreshTransactions', () => {
    it('should fetch transactions for authenticated user', async () => {
      const mockTransactions = [
        { ...mockTransaction, id: '1', amount: 100 },
        { ...mockTransaction, id: '2', amount: 200 },
      ];

      const mockOrder = vi.fn().mockResolvedValue({ data: mockTransactions, error: null });
      const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
      } as any);

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(supabase.from).toHaveBeenCalledWith('transactions');
      expect(mockSelect).toHaveBeenCalledWith('*');
    });

    it('should handle empty transactions for unauthenticated user', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.transactions).toEqual([]);
      });
    });

    it('should handle fetch errors gracefully', async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Network error' },
      });
      const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
      } as any);

      const { toast } = await import('sonner');

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(toast.error).toHaveBeenCalledWith('Failed to load transactions');
    });
  });

  describe('addTransaction', () => {
    it('should add transaction successfully', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockOrder = vi.fn().mockResolvedValue({ data: [], error: null });
      const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
        insert: mockInsert,
      } as any);

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newTransaction = {
        type: 'income' as const,
        category: 'salary',
        amount: 2500,
        description: 'Monthly salary',
        transaction_date: '2025-11-15',
      };

      await result.current.addTransaction(newTransaction);

      await waitFor(() => {
        expect(mockInsert).toHaveBeenCalledWith([
          expect.objectContaining({
            user_id: mockUser.id,
            ...newTransaction,
          }),
        ]);
      });
    });

    it('should handle unauthenticated user', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      const { toast } = await import('sonner');

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newTransaction = {
        type: 'income' as const,
        category: 'salary',
        amount: 2500,
        description: 'Test',
        transaction_date: '2025-11-15',
      };

      // Need to mock getUser again for the addTransaction call
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      await result.current.addTransaction(newTransaction);

      expect(toast.error).toHaveBeenCalledWith('Please sign in');
    });

    it('should rollback on error', async () => {
      const mockInsert = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });
      const mockOrder = vi.fn().mockResolvedValue({ data: [], error: null });
      const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
        insert: mockInsert,
      } as any);

      const { toast } = await import('sonner');

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const newTransaction = {
        type: 'expense' as const,
        category: 'groceries',
        amount: 50,
        description: 'Test',
        transaction_date: '2025-11-15',
      };

      try {
        await result.current.addTransaction(newTransaction);
      } catch (error) {
        // Expected to throw
      }

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to add transaction');
      });
    });
  });

  describe('updateTransaction', () => {
    it('should update transaction successfully', async () => {
      const existingTransaction = { ...mockTransaction, id: 'test-123' };

      const mockUpdate = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockEq = vi.fn().mockReturnValue({ data: null, error: null });
      const mockOrder = vi.fn().mockResolvedValue({
        data: [existingTransaction],
        error: null,
      });
      const mockEqForSelect = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEqForSelect });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
        update: vi.fn().mockReturnValue({ eq: mockEq }),
      } as any);

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Reset the mock to track the update call
      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      } as any);

      const updates = {
        amount: 150,
        description: 'Updated description',
      };

      await result.current.updateTransaction('test-123', updates);

      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledWith('transactions');
      });
    });
  });

  describe('deleteTransaction', () => {
    it('should delete transaction successfully', async () => {
      const existingTransaction = { ...mockTransaction, id: 'test-456' };

      const mockDelete = vi.fn().mockResolvedValue({ data: null, error: null });
      const mockEq = vi.fn().mockReturnValue({ data: null, error: null });
      const mockOrder = vi.fn().mockResolvedValue({
        data: [existingTransaction],
        error: null,
      });
      const mockEqForSelect = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEqForSelect });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
        delete: vi.fn().mockReturnValue({ eq: mockEq }),
      } as any);

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Reset mock for delete operation
      vi.mocked(supabase.from).mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      } as any);

      await result.current.deleteTransaction('test-456');

      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledWith('transactions');
      });
    });
  });

  describe('calculated data', () => {
    it('should calculate balance correctly', async () => {
      const mockTransactions = [
        { ...mockTransaction, id: '1', type: 'income' as const, amount: 1000 },
        { ...mockTransaction, id: '2', type: 'expense' as const, amount: 400 },
        { ...mockTransaction, id: '3', type: 'income' as const, amount: 500 },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockTransactions,
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
      } as any);

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.totalIncome).toBe(1500);
      expect(result.current.totalExpenses).toBe(400);
      expect(result.current.balance).toBe(1100);
    });

    it('should filter income and expense transactions correctly', async () => {
      const mockTransactions = [
        { ...mockTransaction, id: '1', type: 'income' as const, category: 'salary' },
        { ...mockTransaction, id: '2', type: 'expense' as const, category: 'groceries' },
        { ...mockTransaction, id: '3', type: 'income' as const, category: 'freelance' },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockTransactions,
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
      } as any);

      const { result } = renderHook(() => useTransactions(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.incomeTransactions).toHaveLength(2);
      expect(result.current.expenseTransactions).toHaveLength(1);
    });
  });
});
