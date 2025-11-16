-- Create enum for bill frequency
CREATE TYPE public.bill_frequency AS ENUM ('weekly', 'monthly', 'yearly');

-- Create enum for bill status
CREATE TYPE public.bill_status AS ENUM ('paid', 'unpaid', 'overdue');

-- Create enum for bill categories
CREATE TYPE public.bill_category AS ENUM (
  'utilities',
  'housing',
  'insurance',
  'entertainment',
  'health',
  'transport',
  'subscriptions',
  'other'
);

-- Create bills table
CREATE TABLE public.bills (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category public.bill_category NOT NULL DEFAULT 'other',
  due_day INTEGER NOT NULL CHECK (due_day >= 1 AND due_day <= 31),
  frequency public.bill_frequency NOT NULL DEFAULT 'monthly',
  status public.bill_status NOT NULL DEFAULT 'unpaid',
  next_due_date DATE NOT NULL,
  last_paid_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

-- Create policies for bills
CREATE POLICY "Users can view their own bills"
  ON public.bills
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bills"
  ON public.bills
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bills"
  ON public.bills
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bills"
  ON public.bills
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for faster queries
CREATE INDEX idx_bills_user_id ON public.bills(user_id);
CREATE INDEX idx_bills_next_due_date ON public.bills(next_due_date);
CREATE INDEX idx_bills_status ON public.bills(status);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bills_updated_at
  BEFORE UPDATE ON public.bills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate next due date based on frequency
CREATE OR REPLACE FUNCTION public.calculate_next_due_date(
  last_date DATE,
  due_day INTEGER,
  freq public.bill_frequency
)
RETURNS DATE
LANGUAGE plpgsql
AS $$
DECLARE
  next_date DATE;
BEGIN
  CASE freq
    WHEN 'weekly' THEN
      next_date := last_date + INTERVAL '7 days';
    WHEN 'monthly' THEN
      -- Set to next month's due day
      next_date := DATE_TRUNC('month', last_date) + INTERVAL '1 month';
      next_date := next_date + (due_day - 1) * INTERVAL '1 day';
    WHEN 'yearly' THEN
      next_date := last_date + INTERVAL '1 year';
  END CASE;

  RETURN next_date;
END;
$$;

-- Create function to auto-update bill status based on due date
CREATE OR REPLACE FUNCTION public.update_bill_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.next_due_date < CURRENT_DATE AND NEW.status = 'unpaid' THEN
    NEW.status := 'overdue';
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger to auto-update status
CREATE TRIGGER auto_update_bill_status
  BEFORE INSERT OR UPDATE ON public.bills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_bill_status();
