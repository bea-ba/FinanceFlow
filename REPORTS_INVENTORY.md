# Reports Migration Inventory

## Current State Analysis

### TransactionsContext Provides (as of current)

**All-Time Totals:**
- `totalIncome` - sum of all income transactions
- `totalExpenses` - sum of all expense transactions
- `balance` - totalIncome - totalExpenses

**Time-Based Totals:**
- `incomeMonthly` - current month income
- `incomeYearly` - current year income
- `expenseMonthly` - current month expenses
- `expenseYearly` - current year expenses

**Category Breakdowns (All-Time):**
- `incomeBreakdown` - CategoryBreakdown[] (all-time, sorted by total desc)
- `expenseBreakdown` - CategoryBreakdown[] (all-time, sorted by total desc)
- `topExpenseCategories` - CategoryBreakdown[] (top 5 all-time)

**Transaction Lists:**
- `recentTransactions` - Transaction[] (last 10)
- `incomeTransactions` - Transaction[] (all income)
- `expenseTransactions` - Transaction[] (all expense)

### Reports Components Currently Calculate

#### 1. ReportsSummary.tsx
**Status:** Uses local fetch + calculations
**Calculations:**
- `totalIncome` - MONTHLY (current month)
- `totalExpenses` - MONTHLY (current month)
- `netSavings` - MONTHLY income - expenses
- `savingsRate` - (netSavings / income * 100).toFixed(1)
- `topCategory` - top expense category MONTHLY
- `topCategoryAmount` - amount for top category MONTHLY

#### 2. SpendingTrends.tsx
**Status:** Uses local fetch + calculations
**Calculations:**
- Daily aggregates of income/expenses for current month
- Returns: `{ day: string, income: number, expenses: number }[]`

#### 3. CategoryBreakdown.tsx
**Status:** Uses local fetch + calculations
**Calculations:**
- Income breakdown by category (MONTHLY)
- Expense breakdown by category (MONTHLY)
- Returns: `{ name: string, value: number, color: string }[]`

#### 4. IncomeVsExpenses.tsx
**Status:** Uses mockup data
**Calculations:**
- Last 6 months aggregated by month
- Returns: `{ month: string, income: number, expenses: number }[]`

#### 5. MonthlyComparison.tsx
**Status:** Need to check

#### 6. AIInsights.tsx & SmartPredictions.tsx
**Status:** Likely mockup data or simple calculations

## Gap Analysis

### Missing from TransactionsContext (needed by Reports):

1. **Monthly-specific calculations:**
   - ✅ `incomeMonthly` - ALREADY EXISTS
   - ✅ `expenseMonthly` - ALREADY EXISTS
   - ❌ `netSavingsMonthly` - need to add (incomeMonthly - expenseMonthly)
   - ❌ `savingsRateMonthly` - need to add ((netSavingsMonthly / incomeMonthly) * 100)
   - ❌ `incomeBreakdownMonthly` - need to add
   - ❌ `expenseBreakdownMonthly` - need to add
   - ❌ `topExpenseCategoryMonthly` - need to add (derived from expenseBreakdownMonthly)

2. **Daily aggregates for charts:**
   - ❌ `dailyTrendsMonthly` - `{ day: string, income: number, expenses: number }[]`

3. **Historical data (6 months):**
   - ❌ `monthlyTrends` - last 6 months aggregated
   - Returns: `{ month: string, income: number, expenses: number }[]`

## Migration Strategy

### Phase 1.2: Extend TransactionsContext
Add to calculatedData in TransactionsContext:
- `netSavingsMonthly`
- `savingsRateMonthly`
- `incomeBreakdownMonthly`
- `expenseBreakdownMonthly`
- `topExpenseCategoryMonthly`
- `dailyTrendsMonthly`
- `monthlyTrends` (last 6 months)

### Phase 1.3: Migrate Components
1. ReportsSummary → use `incomeMonthly`, `expenseMonthly`, `netSavingsMonthly`, `savingsRateMonthly`, `topExpenseCategoryMonthly`
2. SpendingTrends → use `dailyTrendsMonthly`
3. CategoryBreakdown → use `incomeBreakdownMonthly`, `expenseBreakdownMonthly`
4. IncomeVsExpenses → use `monthlyTrends`
5. MonthlyComparison → TBD after inspection

### Phase 1.4: Testing
- Unit tests for new calculations
- Verify calculations match current logic
- End-to-end data validation

## Estimated Code Reduction

**Current Reports components:**
- ReportsSummary: ~110 lines (60 calculation lines)
- SpendingTrends: ~130 lines (55 calculation lines)
- CategoryBreakdown: ~140 lines (60 calculation lines)

**After migration:**
- Each component: ~40-50 lines (just UI + useTransactions hook)
- **Total reduction: ~175 lines of duplicated logic**

## Decision Log

1. **Monthly vs All-Time:** Reports uses current month filter, context currently has both all-time and monthly/yearly. Solution: Add monthly-specific breakdowns.

2. **Category formatting:** Both context and reports format categories (capitalize, replace underscores). Solution: Keep formatting in context for consistency.

3. **Event listeners:** Reports uses `transaction-added` events. Solution: Remove, context auto-refreshes.

4. **Chart data:** Keep chart data transformations in components, only move aggregations to context.
