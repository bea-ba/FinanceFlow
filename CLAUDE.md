# CLAUDE.md - FinanceFlow AI Assistant Guide

> **Last Updated:** 2025-11-16
> **Project:** FinanceFlow - Personal Finance Management Application
> **Platform:** Lovable.dev
> **Version:** 1.0.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Coding Conventions](#coding-conventions)
6. [Architecture Patterns](#architecture-patterns)
7. [Database Schema](#database-schema)
8. [Component Library](#component-library)
9. [Common Development Tasks](#common-development-tasks)
10. [Important Files Reference](#important-files-reference)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**FinanceFlow** is a modern, full-stack personal finance management application that helps users track income, expenses, bills, and generate financial insights through interactive reports and charts.

### Core Features

- **User Authentication** - Email/password authentication via Supabase
- **Dashboard** - Real-time overview of balance, income, and expenses
- **Income Tracking** - Record and categorize income transactions
- **Expense Tracking** - Track spending across 14+ categories
- **Bills Management** - Manage recurring bills and payments
- **Reports & Analytics** - Visual spending trends and category breakdowns
- **Profile Management** - User settings, theme preferences, notifications
- **Premium Features** - Tiered feature access with upgrade prompts

### Key Technologies

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui (97 components)
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Routing:** React Router v6
- **Animation:** Framer Motion

---

## Tech Stack

### Core Framework

```json
{
  "runtime": "React 18.3.1",
  "language": "TypeScript 5.8.3",
  "bundler": "Vite 5.4.19",
  "compiler": "@vitejs/plugin-react-swc"
}
```

### UI & Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - 97 accessible, customizable components built on Radix UI
- **Framer Motion 12.23.24** - Page transitions and micro-interactions
- **Lucide React 0.462.0** - Icon system (centralized in `src/config/icons.ts`)
- **next-themes 0.3.0** - Dark mode support

### Backend & Data

- **Supabase 2.81.1** - Backend-as-a-Service
  - PostgreSQL database with Row Level Security (RLS)
  - Built-in authentication
  - Real-time subscriptions
- **TanStack Query 5.83.0** - Server state management and caching
- **date-fns 3.6.0** - Date manipulation utilities

### Form & Validation

- **react-hook-form 7.61.1** - Performant form state management
- **zod 3.25.76** - TypeScript-first schema validation
- **@hookform/resolvers** - Zod resolver integration

### Development Tools

- **ESLint 9.32.0** - Code linting (TypeScript + React Hooks + React Refresh)
- **PostCSS + Autoprefixer** - CSS processing
- **Bun** - Primary package manager (also supports npm)

---

## Project Structure

```
/home/user/FinanceFlow/
├── src/
│   ├── components/              # Feature-based components
│   │   ├── auth/               # Login, Signup, ForgotPassword
│   │   ├── bills/              # Bills management UI
│   │   ├── dashboard/          # Dashboard Header, Layout, Cards, Charts
│   │   ├── income/             # Income tracking components
│   │   ├── money-out/          # Expense tracking components
│   │   ├── profile/            # User profile & settings
│   │   ├── reports/            # Analytics & reporting
│   │   └── ui/                 # shadcn/ui components (97 files)
│   ├── pages/                  # Route-level page components
│   │   ├── Index.tsx           # Dashboard page (/)
│   │   ├── Auth.tsx            # Authentication page (/auth)
│   │   ├── Income.tsx          # Income page (/income)
│   │   ├── MoneyOut.tsx        # Expenses page (/money-out)
│   │   ├── Reports.tsx         # Reports page (/reports)
│   │   ├── Profile.tsx         # Profile page (/profile)
│   │   ├── Bills.tsx           # Bills page (/bills)
│   │   └── NotFound.tsx        # 404 page
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-toast.ts        # Toast notifications (Sonner)
│   │   ├── use-mobile.tsx      # Mobile breakpoint detection
│   │   └── useAppIcon.tsx      # Centralized icon access
│   ├── lib/                    # Utilities
│   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── integrations/           # Third-party integrations
│   │   └── supabase/
│   │       ├── client.ts       # Supabase client configuration
│   │       └── types.ts        # Auto-generated DB types (245 lines)
│   ├── config/                 # Configuration
│   │   └── icons.ts            # Centralized icon definitions
│   ├── App.tsx                 # Root component with routing
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles & CSS variables
├── supabase/
│   ├── migrations/             # Database migration files
│   └── config.toml             # Supabase local configuration
├── public/                     # Static assets
├── .env                        # Environment variables (Supabase keys)
├── vite.config.ts              # Vite configuration (port 8080, aliases)
├── tailwind.config.ts          # Tailwind theme customization
├── tsconfig.json               # TypeScript base config
├── tsconfig.app.json           # App TypeScript settings
├── tsconfig.node.json          # Node/build TypeScript settings
├── eslint.config.js            # ESLint configuration
├── postcss.config.js           # PostCSS plugins
├── components.json             # shadcn/ui configuration
└── package.json                # Dependencies & scripts
```

### File Count
- **Total TypeScript files:** 116+
- **Components:** 97 shadcn/ui + ~20 feature components
- **Pages:** 8 route pages
- **Hooks:** 3 custom hooks

---

## Development Setup

### Environment Variables

Create `.env` file in root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Installation

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### Development Scripts

```bash
# Start dev server (http://localhost:8080)
bun run dev
# or
npm run dev

# Build for production
bun run build

# Build in development mode
bun run build:dev

# Lint code
bun run lint

# Preview production build
bun run preview
```

### Development Server

- **URL:** `http://localhost:8080`
- **Host:** `::` (accepts all IPv6/IPv4 connections)
- **Hot Module Replacement (HMR):** Enabled via Vite + React SWC
- **Auto-refresh:** Changes reflect instantly

---

## Coding Conventions

### File Naming

- **Components:** PascalCase, match component name exactly
  - Example: `DashboardLayout.tsx`, `SummaryCards.tsx`
- **Hooks:** camelCase with `use` prefix
  - Example: `use-toast.ts`, `use-mobile.tsx`
- **Utilities:** camelCase
  - Example: `utils.ts`
- **Pages:** PascalCase
  - Example: `Index.tsx`, `Auth.tsx`

### Component Structure

```typescript
// Feature component example (src/components/dashboard/SummaryCards.tsx)
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";

interface SummaryCardsProps {
  // Props typed inline or as interface
}

export const SummaryCards = ({ prop1, prop2 }: SummaryCardsProps) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Data fetching logic
  }, []);

  return (
    <div className="grid gap-4">
      {/* Component JSX */}
    </div>
  );
};
```

### Import Order

1. React imports
2. Third-party libraries
3. Internal components (UI components)
4. Hooks
5. Utils and helpers
6. Config and constants
7. Types

Example:
```typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AppIcons } from "@/config/icons";
```

### TypeScript Conventions

- **Interfaces over types** for object shapes
- **PascalCase** for type/interface names
- **Inline prop types** for simple components
- **Separate type files** for complex shared types
- **Type assertions:** Avoid `as` unless necessary

```typescript
// Prefer
interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

// Over
type UserProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};
```

### CSS & Styling

- **Tailwind utility classes** - Primary styling method
- **No inline styles** - Use Tailwind or CSS variables
- **CSS variables** for theme colors (defined in `src/index.css`)
- **Responsive design** - Mobile-first approach
- **Dark mode** - Use Tailwind `dark:` prefix

Example:
```tsx
<div className="flex flex-col gap-4 p-6 bg-background dark:bg-dark-background">
  <h1 className="text-2xl font-bold text-foreground">Title</h1>
</div>
```

### Icon Usage

**ALWAYS use the centralized icon system:**

```typescript
import { AppIcons } from "@/config/icons";

// Usage
<AppIcons.navigation.home className="w-5 h-5" />
<AppIcons.financial.dollarSign className="w-4 h-4 text-success" />
```

**Categories:**
- `navigation` - Home, menu, search, etc.
- `financial` - Dollar sign, trend up/down, wallet, etc.
- `analytics` - Pie chart, bar chart, line chart, etc.
- `actions` - Plus, edit, trash, save, etc.
- `status` - Check, alert, info, etc.
- `ui` - Chevrons, close, more vertical, etc.

---

## Architecture Patterns

### State Management Strategy

```
┌─────────────────────────────────────────────┐
│           State Management                   │
├─────────────────────────────────────────────┤
│ Server State:   TanStack Query (React Query)│
│ UI State:       React useState/useReducer   │
│ Form State:     React Hook Form             │
│ Auth State:     Supabase Session            │
│ Theme State:    next-themes                 │
└─────────────────────────────────────────────┘
```

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Supabase Client Call
    ↓
PostgreSQL Database (RLS applied)
    ↓
React Query Cache (optional)
    ↓
Component Re-render
    ↓
UI Update
```

### Routing Architecture

**Client-side routing** with React Router v6:

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/income" element={<Income />} />
      <Route path="/money-out" element={<MoneyOut />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
```

**Protected routes** - Auth check in page components:

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };
  checkAuth();
}, [navigate]);
```

**Page transitions** - Framer Motion AnimatePresence:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>
```

### Form Handling Pattern

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define schema
const schema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// 2. Setup form
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    amount: 0,
    category: "",
    description: "",
  },
});

// 3. Handle submission
const onSubmit = async (data: FormData) => {
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    ...data,
  });

  if (error) {
    toast.error("Failed to save transaction");
  } else {
    toast.success("Transaction saved");
    form.reset();
  }
};
```

### Component Composition Pattern

```typescript
// Layout wrapper
<DashboardLayout>
  {/* Feature components */}
  <SummaryCards />
  <RecentTransactions />
  <SpendingChart />
</DashboardLayout>

// Card composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

---

## Database Schema

### Tables

#### `profiles`
User profile information (one-to-one with auth.users)

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `transactions`
Income and expense records

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,  -- 'income' | 'expense'
  category transaction_category NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
```

### Enums

#### `transaction_type`
```sql
CREATE TYPE transaction_type AS ENUM ('income', 'expense');
```

#### `transaction_category`
```sql
CREATE TYPE transaction_category AS ENUM (
  -- Income categories
  'salary',
  'freelance',
  'investment',
  'other_income',

  -- Expense categories
  'groceries',
  'dining',
  'transportation',
  'utilities',
  'entertainment',
  'healthcare',
  'shopping',
  'bills',
  'education',
  'other'
);
```

### Row Level Security (RLS)

**All tables have RLS enabled**

```sql
-- Profiles: Users can only view/edit their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Transactions: Users can only access their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);
```

### Database Access Pattern

```typescript
// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Query transactions
const { data: transactions, error } = await supabase
  .from("transactions")
  .select("*")
  .eq("user_id", user.id)
  .order("transaction_date", { ascending: false });

// Insert transaction
const { data, error } = await supabase
  .from("transactions")
  .insert({
    user_id: user.id,
    type: "expense",
    category: "groceries",
    amount: 45.99,
    description: "Weekly groceries",
    transaction_date: new Date().toISOString(),
  });

// Update transaction
const { error } = await supabase
  .from("transactions")
  .update({ amount: 50.00 })
  .eq("id", transactionId);

// Delete transaction
const { error } = await supabase
  .from("transactions")
  .delete()
  .eq("id", transactionId);
```

### Type Safety

Use auto-generated types from `src/integrations/supabase/types.ts`:

```typescript
import type { Database } from "@/integrations/supabase/types";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];
```

---

## Component Library

### shadcn/ui Components (97 total)

**Most commonly used:**

```typescript
// Layout
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Forms
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

// Feedback
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Overlay
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
```

### Adding New shadcn/ui Components

```bash
# List available components
npx shadcn@latest add

# Add specific component
npx shadcn@latest add [component-name]

# Example
npx shadcn@latest add dropdown-menu
```

Configuration file: `components.json`

---

## Common Development Tasks

### Adding a New Page

1. **Create page component** in `src/pages/`:

```typescript
// src/pages/NewFeature.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const NewFeature = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate("/auth");
    };
    checkAuth();
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">New Feature</h1>
      </div>
    </DashboardLayout>
  );
};

export default NewFeature;
```

2. **Add route** in `src/App.tsx`:

```typescript
import NewFeature from "@/pages/NewFeature";

// Inside <Routes>
<Route path="/new-feature" element={<NewFeature />} />
```

3. **Add navigation** in `src/components/dashboard/DashboardLayout.tsx`:

```typescript
import { AppIcons } from "@/config/icons";

// Add to navigation items
{
  name: "New Feature",
  href: "/new-feature",
  icon: AppIcons.navigation.bookmark,  // Choose appropriate icon
}
```

### Adding a New Feature Component

1. **Create component directory** (if needed):
   - `src/components/new-feature/`

2. **Create component file**:

```typescript
// src/components/new-feature/FeatureCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AppIcons } from "@/config/icons";

interface FeatureCardProps {
  title: string;
  value: number;
}

export const FeatureCard = ({ title, value }: FeatureCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <AppIcons.financial.dollarSign className="w-4 h-4" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${value.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};
```

### Adding a Database Table

1. **Create migration** in `supabase/migrations/`:

```sql
-- supabase/migrations/YYYYMMDDHHMMSS_add_new_table.sql

CREATE TABLE IF NOT EXISTS new_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records"
  ON new_table FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own records"
  ON new_table FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add indexes
CREATE INDEX idx_new_table_user_id ON new_table(user_id);
```

2. **Update TypeScript types**:
   - Re-generate types from Supabase CLI or manually update `src/integrations/supabase/types.ts`

3. **Use in components**:

```typescript
const { data, error } = await supabase
  .from("new_table")
  .select("*")
  .eq("user_id", user.id);
```

### Adding Form Validation

```typescript
import { z } from "zod";

// Define schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  amount: z.number().positive("Amount must be positive"),
  category: z.enum(["groceries", "dining", "transportation"]),
  date: z.date(),
  description: z.string().min(3, "Description must be at least 3 characters").optional(),
});

// Use with react-hook-form
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    amount: 0,
    category: "groceries",
    date: new Date(),
    description: "",
  },
});
```

### Adding Toast Notifications

```typescript
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Success
toast({
  title: "Success",
  description: "Transaction saved successfully",
});

// Error
toast({
  title: "Error",
  description: "Failed to save transaction",
  variant: "destructive",
});

// Warning
toast({
  title: "Warning",
  description: "This action cannot be undone",
  variant: "default",
});
```

### Working with Charts

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="income" stroke="hsl(var(--success))" />
    <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" />
  </LineChart>
</ResponsiveContainer>
```

---

## Important Files Reference

### Configuration Files

| File | Purpose | When to Modify |
|------|---------|----------------|
| `vite.config.ts` | Vite build configuration, dev server settings | Changing port, adding plugins, path aliases |
| `tailwind.config.ts` | Tailwind theme, colors, shadows, animations | Customizing design system, adding colors |
| `tsconfig.json` | TypeScript compiler settings | Changing type checking rules, paths |
| `eslint.config.js` | Code linting rules | Adding/modifying linting rules |
| `components.json` | shadcn/ui configuration | Customizing component generation |
| `.env` | Environment variables | Adding Supabase keys, API endpoints |

### Core Application Files

| File | Purpose | Modify Carefully |
|------|---------|------------------|
| `src/main.tsx` | Application entry point | Rarely - only for global providers |
| `src/App.tsx` | Root component, routing setup | Adding/removing routes |
| `src/index.css` | Global styles, CSS variables | Theme changes, design tokens |
| `src/integrations/supabase/client.ts` | Supabase client configuration | Rarely - core auth setup |
| `src/integrations/supabase/types.ts` | Database TypeScript types | Auto-generated, don't manually edit |
| `src/config/icons.ts` | Centralized icon system | Adding new icon categories |

### Key Feature Files

| File | Responsible For |
|------|----------------|
| `src/components/dashboard/DashboardLayout.tsx` | Main app layout, navigation |
| `src/components/dashboard/SummaryCards.tsx` | Dashboard balance cards |
| `src/components/auth/Login.tsx` | User authentication |
| `src/pages/Index.tsx` | Dashboard page |

---

## Best Practices

### Data Fetching

**DO:**
```typescript
// Use async/await with proper error handling
const fetchTransactions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw error;
    setTransactions(data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    toast.error("Failed to load transactions");
  }
};
```

**DON'T:**
```typescript
// Avoid missing error handling
const fetchTransactions = async () => {
  const { data } = await supabase.from("transactions").select("*");
  setTransactions(data);  // Could be null!
};
```

### Authentication

**DO:**
```typescript
// Always check auth before rendering protected content
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setIsAuthenticated(true);
    }
  };
  checkAuth();
}, [navigate]);

if (!isAuthenticated) {
  return <div>Loading...</div>;
}
```

**DON'T:**
```typescript
// Don't assume user is authenticated
const { data } = await supabase.from("transactions").select("*");
// RLS will return empty results, but no error!
```

### Styling

**DO:**
```typescript
// Use semantic color variables
<div className="bg-background text-foreground">
  <Button variant="default">Primary Action</Button>
  <p className="text-success">+$500.00</p>
  <p className="text-destructive">-$250.00</p>
</div>
```

**DON'T:**
```typescript
// Avoid hardcoded colors
<div className="bg-white text-black">
  <Button className="bg-blue-500">Action</Button>
</div>
```

### Type Safety

**DO:**
```typescript
// Use proper TypeScript types
import type { Database } from "@/integrations/supabase/types";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

const formatTransaction = (transaction: Transaction): string => {
  return `${transaction.type}: $${transaction.amount}`;
};
```

**DON'T:**
```typescript
// Avoid any
const formatTransaction = (transaction: any) => {
  return `${transaction.type}: $${transaction.amount}`;
};
```

### Component Organization

**DO:**
```typescript
// Feature-based organization
components/
  dashboard/
    DashboardLayout.tsx
    SummaryCards.tsx
    RecentTransactions.tsx
  income/
    IncomeForm.tsx
    IncomeList.tsx
```

**DON'T:**
```typescript
// Generic organization
components/
  forms/
    Form1.tsx
    Form2.tsx
  lists/
    List1.tsx
```

### Form Handling

**DO:**
```typescript
// Use react-hook-form + zod
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues,
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    {/* Form fields */}
  </form>
</Form>
```

**DON'T:**
```typescript
// Avoid manual state management for forms
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({});
```

---

## Troubleshooting

### Common Issues

#### 1. Supabase Connection Errors

**Symptom:** `Error: Invalid API key` or connection timeout

**Solution:**
- Check `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- Ensure environment variables are prefixed with `VITE_`
- Restart dev server after changing `.env`

```bash
bun run dev
```

#### 2. RLS Policy Violations

**Symptom:** Queries return empty results or "new row violates row-level security policy"

**Solution:**
- Ensure `user_id` is set correctly when inserting
- Check RLS policies in Supabase dashboard
- Verify user is authenticated before querying

```typescript
// Always get user first
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  // Handle unauthenticated state
  return;
}

// Then include user_id in queries
const { data } = await supabase
  .from("transactions")
  .select("*")
  .eq("user_id", user.id);
```

#### 3. Type Errors After Schema Changes

**Symptom:** TypeScript errors after updating database schema

**Solution:**
- Re-generate types from Supabase:
  - Go to Supabase Dashboard → Project Settings → API
  - Copy TypeScript types
  - Update `src/integrations/supabase/types.ts`

#### 4. Tailwind Classes Not Applying

**Symptom:** CSS classes not working

**Solution:**
- Ensure file is in Tailwind content paths (`tailwind.config.ts`)
- Check class name is correct (no typos)
- Verify no conflicting styles
- Check if using dynamic classes (won't work):

```typescript
// DON'T - Dynamic classes don't work with Tailwind
<div className={`text-${color}-500`}>  // ❌

// DO - Use full class names
<div className={color === 'red' ? 'text-red-500' : 'text-green-500'}>  // ✅
```

#### 5. Icons Not Displaying

**Symptom:** Icons appear as empty boxes or missing

**Solution:**
- Use centralized icon system: `import { AppIcons } from "@/config/icons"`
- Ensure icon exists in `src/config/icons.ts`
- Add size classes: `className="w-5 h-5"`

#### 6. Form Validation Not Working

**Symptom:** Form submits without validation

**Solution:**
- Check Zod schema is defined correctly
- Ensure `zodResolver` is passed to `useForm`
- Verify form is using `form.handleSubmit(onSubmit)`

#### 7. Build Errors

**Symptom:** `bun run build` fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
bun install
bun run build
```

#### 8. Authentication Redirect Loop

**Symptom:** Constantly redirecting between `/auth` and `/`

**Solution:**
- Check auth logic in page components
- Ensure session check completes before redirecting
- Add loading state to prevent premature redirects

```typescript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
    setIsLoading(false);
  };
  checkAuth();
}, []);

if (isLoading) return <div>Loading...</div>;
```

---

## Git Workflow

### Current Branch

```bash
# Development branch (DO NOT push to other branches)
claude/claude-md-mi1g7zurvx0tqvkx-017rusAH4MauHLf5MTS94DMh
```

### Commit Guidelines

```bash
# Good commit messages
git commit -m "Add income tracking form with validation"
git commit -m "Fix RLS policy for transactions table"
git commit -m "Update dashboard cards to show monthly totals"

# Bad commit messages
git commit -m "Update"
git commit -m "Fix bug"
git commit -m "Changes"
```

### Pushing Changes

```bash
# Always use -u flag with origin
git push -u origin claude/claude-md-mi1g7zurvx0tqvkx-017rusAH4MauHLf5MTS94DMh

# If network errors occur, retry with exponential backoff
# (2s, 4s, 8s, 16s)
```

---

## Development Workflow Summary

### Starting a New Feature

1. **Plan the feature**
   - Identify affected components
   - Check if database changes needed
   - List required UI components

2. **Create components**
   - Add feature directory in `src/components/`
   - Build components using shadcn/ui
   - Use centralized icons from `@/config/icons`

3. **Add database schema** (if needed)
   - Create migration in `supabase/migrations/`
   - Update RLS policies
   - Re-generate TypeScript types

4. **Implement data fetching**
   - Use Supabase client
   - Add error handling
   - Show loading states

5. **Add forms** (if needed)
   - Use React Hook Form + Zod
   - Add validation schema
   - Implement submit handler

6. **Style components**
   - Use Tailwind utilities
   - Follow design system colors
   - Ensure mobile responsiveness

7. **Test thoroughly**
   - Test auth flows
   - Test RLS policies (different users)
   - Test responsive design
   - Test error states

8. **Commit and push**
   - Write clear commit message
   - Push to designated branch

---

## Quick Reference

### Path Aliases

```typescript
@/components     → src/components
@/pages          → src/pages
@/hooks          → src/hooks
@/lib            → src/lib
@/config         → src/config
@/integrations   → src/integrations
```

### Design Tokens

```css
/* Colors */
--primary: 142 88% 50%        /* Mint green */
--success: 142 76% 36%        /* Green */
--destructive: 0 84% 60%      /* Red */
--warning: 36 100% 56%        /* Orange */
--background: 138 17% 98%     /* Light */
--foreground: 142 11% 15%     /* Dark text */

/* Shadows */
--shadow-soft                 /* Subtle elevation */
--shadow-card                 /* Card elevation */
--shadow-glow                 /* Primary glow */
--shadow-elevated             /* High elevation */
```

### Breakpoints

```typescript
// Mobile breakpoint
const isMobile = useMediaQuery("(max-width: 768px)");

// Tailwind breakpoints
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **shadcn/ui Docs:** https://ui.shadcn.com
- **React Router Docs:** https://reactrouter.com
- **TanStack Query Docs:** https://tanstack.com/query
- **React Hook Form Docs:** https://react-hook-form.com
- **Zod Docs:** https://zod.dev

---

**Last Updated:** 2025-11-16
**Maintainer:** AI Assistant (Claude)
**Version:** 1.0.0
