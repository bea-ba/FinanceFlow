import {
  Wallet,
  Receipt,
  FileText,
  TrendingUp,
  Target,
  DollarSign,
  BarChart3,
  Bell
} from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

// Dashboard Empty State
export const DashboardEmptyState = ({ onAddTransaction }: { onAddTransaction: () => void }) => {
  return (
    <EmptyState
      icon={TrendingUp}
      title="Welcome to FinanceFlow!"
      description="Let's get started by adding your first transaction. Track your income, expenses, and bills all in one place."
      action={{
        label: "Add First Transaction",
        onClick: onAddTransaction,
      }}
    />
  );
};

// Income Empty State
export const IncomeEmptyState = ({
  onAddIncome,
  onImport
}: {
  onAddIncome: () => void;
  onImport: () => void;
}) => {
  return (
    <EmptyState
      icon={DollarSign}
      title="No income tracked yet"
      description="Start tracking your income sources. Add entries manually or import from Google Drive to see your earnings over time."
      action={{
        label: "Add Income",
        onClick: onAddIncome,
      }}
      secondaryAction={{
        label: "Import from Drive",
        onClick: onImport,
      }}
    />
  );
};

// Bills Empty State
export const BillsEmptyState = ({
  onAddBill,
  onScanEmail
}: {
  onAddBill: () => void;
  onScanEmail: () => void;
}) => {
  return (
    <EmptyState
      icon={FileText}
      title="No bills to manage"
      description="Keep track of your recurring bills and never miss a payment. Add bills manually or scan your email for automated tracking."
      action={{
        label: "Add Bill",
        onClick: onAddBill,
      }}
      secondaryAction={{
        label: "Scan Email",
        onClick: onScanEmail,
      }}
    />
  );
};

// Spending/Expenses Empty State
export const SpendingEmptyState = ({
  onAddExpense,
  onScanReceipt
}: {
  onAddExpense: () => void;
  onScanReceipt: () => void;
}) => {
  return (
    <EmptyState
      icon={Receipt}
      title="No expenses recorded"
      description="Track where your money goes. Add expenses manually or scan receipts to automatically capture spending details."
      action={{
        label: "Add Expense",
        onClick: onAddExpense,
      }}
      secondaryAction={{
        label: "Scan Receipt",
        onClick: onScanReceipt,
      }}
    />
  );
};

// Insights Empty State
export const InsightsEmptyState = () => {
  return (
    <EmptyState
      icon={BarChart3}
      title="Building your insights..."
      description="Add transactions to your account and we'll generate personalized insights about your spending patterns and financial trends."
      className="min-h-[400px]"
    />
  );
};

// Goals Empty State
export const GoalsEmptyState = ({ onCreateGoal }: { onCreateGoal: () => void }) => {
  return (
    <EmptyState
      icon={Target}
      title="No financial goals yet"
      description="Set savings goals to stay motivated and track your progress. Whether it's a vacation, emergency fund, or new car—we'll help you get there."
      action={{
        label: "Create First Goal",
        onClick: onCreateGoal,
      }}
    />
  );
};

// Notifications Empty State
export const NotificationsEmptyState = () => {
  return (
    <EmptyState
      icon={Bell}
      title="All caught up!"
      description="You don't have any notifications right now. We'll let you know when there's something important."
      className="min-h-[300px]"
    />
  );
};

// Generic Wallet Empty State (for other contexts)
export const GenericEmptyState = ({ onAction }: { onAction?: () => void }) => {
  return (
    <EmptyState
      icon={Wallet}
      title="Nothing here yet"
      description="Start adding data to see it appear here."
      action={onAction ? {
        label: "Get Started",
        onClick: onAction,
      } : undefined}
    />
  );
};
