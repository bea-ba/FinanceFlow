# Phase 2: Test Plan & Verification

## Overview
Verify that the centralized TransactionsContext architecture works correctly across all pages with instant updates and consistent data.

## Manual Smoke Test Checklist

### Test 1: Fresh Load
**Steps:**
1. Start dev server
2. Navigate to Dashboard
3. Navigate to Reports

**Expected:**
- ✅ No console errors
- ✅ All components render
- ✅ Data loads once (check Network tab for single transactions query)
- ✅ Loading states display correctly
- ✅ All cards show correct data

**Actual:** (To be verified)
- Server running: ✅ (http://localhost:8080)
- Compiles without errors: ✅
- Manual verification needed: User should test

### Test 2: Add Transaction from Dashboard
**Steps:**
1. Open Dashboard
2. Click "Quick Add" button
3. Add a new expense (€50, Groceries, today)
4. Submit

**Expected Instant Updates:**
- ✅ Dashboard SummaryCards updates immediately (Money Out increases by €50, Balance decreases)
- ✅ Dashboard SpendingChart updates (Groceries bar increases)
- ✅ Dashboard RecentTransactions shows new transaction at top
- ✅ Navigate to Reports → All cards update (Total Expenses, Top Category if Groceries wasn't top)
- ✅ Reports SpendingTrends shows new data point
- ✅ Reports CategoryBreakdown shows updated Groceries amount
- ✅ Navigate to Money Out page → Summary cards updated
- ✅ No page refresh needed

**Test Data:**
```json
{
  "type": "expense",
  "category": "groceries",
  "amount": 50.00,
  "description": "Test transaction",
  "transaction_date": "2025-11-16"
}
```

### Test 3: Edit Transaction from Income Page
**Steps:**
1. Navigate to Income page
2. Find an existing income transaction
3. Click Edit (three dots menu)
4. Change amount from X to X+100
5. Submit

**Expected Instant Updates:**
- ✅ Income page summary updates (Monthly/Yearly totals increase)
- ✅ Income breakdown updates if category amounts change
- ✅ Navigate to Dashboard → Balance increases by €100
- ✅ Dashboard SummaryCards shows updated Money In
- ✅ Navigate to Reports → Total Income card updates
- ✅ Reports Net Savings increases by €100
- ✅ Savings Rate recalculates
- ✅ No page refresh needed

### Test 4: Delete Transaction from Money Out Page
**Steps:**
1. Navigate to Money Out page
2. Find a transaction (note the amount)
3. Click Delete (three dots menu)
4. Confirm deletion

**Expected Instant Updates:**
- ✅ Money Out page summary updates (totals decrease)
- ✅ Transaction disappears from list immediately
- ✅ Expense breakdown recalculates
- ✅ Navigate to Dashboard → Balance increases
- ✅ Dashboard SpendingChart updates
- ✅ Navigate to Reports → All relevant cards update
- ✅ If deleted transaction was top category, new top category shows
- ✅ No page refresh needed

### Test 5: Cross-Page Consistency
**Steps:**
1. Open Dashboard in one view
2. Note current totals
3. Navigate to Reports
4. Compare Reports totals with Dashboard totals

**Expected:**
- ✅ Dashboard "Money In" = Reports "Total Income"
- ✅ Dashboard "Money Out" = Reports "Total Expenses"
- ✅ Dashboard "Balance" = Reports "Net Savings"
- ✅ All percentages/breakdowns mathematically correct
- ✅ Same transaction counts everywhere

### Test 6: Empty State Handling
**Steps:**
1. (If possible) Test with no transactions

**Expected:**
- ✅ All components show appropriate empty states
- ✅ No division by zero errors
- ✅ No crashes or console errors
- ✅ Charts show empty/placeholder states

### Test 7: Performance Check
**Steps:**
1. Add 50+ transactions (if test data available)
2. Navigate between pages
3. Add/Edit/Delete transactions

**Expected:**
- ✅ No noticeable lag (<100ms)
- ✅ useMemo prevents unnecessary recalculations
- ✅ Page transitions smooth
- ✅ No excessive re-renders (check React DevTools)

## Automated Test Scenarios (Future)

### Unit Tests for TransactionsContext
```typescript
describe('TransactionsContext Calculations', () => {
  test('calculates netSavingsMonthly correctly', () => {
    // Test with sample transactions
    // Verify incomeMonthly - expenseMonthly = netSavingsMonthly
  });

  test('calculates savingsRateMonthly correctly', () => {
    // Test percentage calculation
    // Verify (netSavings / income * 100)
  });

  test('filters monthly transactions correctly', () => {
    // Test with transactions from different months
    // Verify only current month included
  });

  test('handles empty transactions array', () => {
    // Verify no crashes, returns 0 values
  });

  test('handles division by zero', () => {
    // Test savingsRate when income = 0
    // Verify returns 0, not NaN or Infinity
  });
});
```

### Integration Tests
```typescript
describe('Reports Page Integration', () => {
  test('adding transaction updates all Reports components', async () => {
    // Render Reports page
    // Add transaction via context
    // Verify all cards update
  });

  test('context refresh updates all subscribed components', async () => {
    // Mount multiple components
    // Call refreshTransactions()
    // Verify all re-render with new data
  });
});
```

## Data Validation Tests

### Calculation Accuracy Test
**Goal:** Verify context calculations match database aggregates

**Test Query:**
```sql
-- For current month
SELECT
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
FROM transactions
WHERE user_id = '<user_id>'
  AND transaction_date >= DATE_TRUNC('month', CURRENT_DATE)
  AND transaction_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';
```

**Verification:**
- Query result income = context.incomeMonthly
- Query result expenses = context.expenseMonthly
- income - expenses = context.netSavingsMonthly

## UI Consistency Checks

### Visual Inspection
- ✅ No flicker during updates
- ✅ Loading states display properly
- ✅ No layout shifts
- ✅ Smooth transitions
- ✅ Consistent formatting (€ symbol, decimal places)
- ✅ Charts animate smoothly

### Accessibility
- ✅ No console errors/warnings
- ✅ Keyboard navigation works
- ✅ Screen reader friendly (aria labels)

## Performance Benchmarks

### Acceptable Thresholds
- Initial page load: < 1s
- Add transaction: < 200ms total (including UI update)
- Page navigation: < 100ms
- Context recalculation: < 50ms (with 1000 transactions)

### Monitoring
- Use React DevTools Profiler
- Check network waterfall
- Monitor useMemo effectiveness

## Known Limitations / Deferred Items

1. **MonthlyComparison.tsx** - Still uses old pattern
   - Low priority, uses last 4 months data
   - Can be migrated using monthlyTrends

2. **AIInsights.tsx, SmartPredictions.tsx** - Not migrated
   - Likely using mockup data
   - Phase 3 items (AI features)

3. **DateRangeFilter.tsx** - Not implemented
   - Currently reports show current month only
   - Future: Add date range filtering to context

4. **ExportReports.tsx** - Not migrated
   - Phase 2 feature (export functionality)
   - Can use context data when implemented

## Success Criteria

### Phase 2 Complete When:
- ✅ All Test 1-7 pass
- ✅ No console errors during normal usage
- ✅ Instant updates verified across all pages
- ✅ No data inconsistencies found
- ✅ Performance within acceptable thresholds
- ✅ UI smooth with no jarring transitions

### Documentation Updated:
- ✅ CLAUDE.md updated with new patterns
- ✅ Test results documented
- ✅ Any bugs/issues logged

## Bug Tracking

### Issues Found:
(To be filled during testing)

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| - | - | - | - |

## Test Execution Log

### Session 1: [Date]
**Tester:** [Name]
**Environment:** Dev (localhost:8080)

| Test | Status | Notes |
|------|--------|-------|
| Test 1: Fresh Load | ⏳ Pending | - |
| Test 2: Add Transaction | ⏳ Pending | - |
| Test 3: Edit Transaction | ⏳ Pending | - |
| Test 4: Delete Transaction | ⏳ Pending | - |
| Test 5: Cross-Page Consistency | ⏳ Pending | - |
| Test 6: Empty State | ⏳ Pending | - |
| Test 7: Performance | ⏳ Pending | - |

---
**Status:** Test Plan Ready
**Next:** Execute manual smoke tests
**Blocked:** None - User can execute tests in browser
