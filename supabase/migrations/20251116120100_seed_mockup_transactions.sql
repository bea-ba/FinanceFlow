-- Seed mockup transaction data for demo/testing purposes
-- This creates realistic sample data for the Reports page to display

-- Note: This migration uses a placeholder UUID for user_id
-- In production, replace '00000000-0000-0000-0000-000000000000' with actual user IDs
-- For development/demo, you can create a test user and replace the UUID

-- Create a function to generate seed data for a specific user
CREATE OR REPLACE FUNCTION seed_demo_transactions(target_user_id UUID)
RETURNS void AS $$
BEGIN
  -- Clear existing demo data for this user (optional - comment out if you want to preserve existing data)
  -- DELETE FROM transactions WHERE user_id = target_user_id;

  -- NOVEMBER 2025 TRANSACTIONS

  -- Income transactions (November)
  INSERT INTO transactions (user_id, type, category, amount, description, transaction_date) VALUES
  (target_user_id, 'income', 'salary', 5500.00, 'Monthly salary - November', '2025-11-01'),
  (target_user_id, 'income', 'freelance', 2450.00, 'Web design project', '2025-11-15'),
  (target_user_id, 'income', 'freelance', 1000.00, 'Consulting work', '2025-11-20');

  -- Expense transactions (November)
  INSERT INTO transactions (user_id, type, category, amount, description, transaction_date) VALUES
  -- Groceries
  (target_user_id, 'expense', 'groceries', 156.80, 'Weekly groceries - Whole Foods', '2025-11-02'),
  (target_user_id, 'expense', 'groceries', 203.45, 'Weekly groceries - Trader Joes', '2025-11-09'),
  (target_user_id, 'expense', 'groceries', 178.90, 'Weekly groceries - Safeway', '2025-11-16'),
  (target_user_id, 'expense', 'groceries', 198.20, 'Weekly groceries - Whole Foods', '2025-11-23'),
  (target_user_id, 'expense', 'groceries', 511.15, 'Monthly bulk shopping - Costco', '2025-11-10'),

  -- Dining
  (target_user_id, 'expense', 'dining', 45.30, 'Dinner at Italian restaurant', '2025-11-03'),
  (target_user_id, 'expense', 'dining', 67.80, 'Sushi night out', '2025-11-08'),
  (target_user_id, 'expense', 'dining', 125.50, 'Anniversary dinner', '2025-11-14'),
  (target_user_id, 'expense', 'dining', 38.90, 'Brunch with friends', '2025-11-17'),
  (target_user_id, 'expense', 'dining', 52.40, 'Thai takeout', '2025-11-22'),
  (target_user_id, 'expense', 'dining', 89.70, 'Steakhouse dinner', '2025-11-28'),

  -- Transportation
  (target_user_id, 'expense', 'transport', 75.00, 'Gas - Shell', '2025-11-05'),
  (target_user_id, 'expense', 'transport', 82.50, 'Gas - Chevron', '2025-11-12'),
  (target_user_id, 'expense', 'transport', 68.30, 'Gas - BP', '2025-11-19'),
  (target_user_id, 'expense', 'transport', 15.00, 'Parking downtown', '2025-11-07'),
  (target_user_id, 'expense', 'transport', 45.50, 'Uber rides', '2025-11-21'),
  (target_user_id, 'expense', 'transport', 125.00, 'Car maintenance - oil change', '2025-11-25'),

  -- Utilities
  (target_user_id, 'expense', 'utilities', 145.80, 'Electric bill', '2025-11-01'),
  (target_user_id, 'expense', 'utilities', 85.50, 'Water bill', '2025-11-01'),
  (target_user_id, 'expense', 'utilities', 89.90, 'Internet - Comcast', '2025-11-05'),
  (target_user_id, 'expense', 'utilities', 55.00, 'Phone bill - T-Mobile', '2025-11-10'),

  -- Entertainment
  (target_user_id, 'expense', 'entertainment', 15.99, 'Netflix subscription', '2025-11-01'),
  (target_user_id, 'expense', 'entertainment', 12.99, 'Spotify Premium', '2025-11-01'),
  (target_user_id, 'expense', 'entertainment', 45.00, 'Concert tickets', '2025-11-06'),
  (target_user_id, 'expense', 'entertainment', 28.50, 'Movie night', '2025-11-13'),
  (target_user_id, 'expense', 'entertainment', 67.80, 'Theater show', '2025-11-20'),
  (target_user_id, 'expense', 'entertainment', 39.90, 'Video games', '2025-11-27'),

  -- Shopping
  (target_user_id, 'expense', 'shopping', 89.99, 'New shoes - Nike', '2025-11-04'),
  (target_user_id, 'expense', 'shopping', 145.00, 'Clothing - H&M', '2025-11-11'),
  (target_user_id, 'expense', 'shopping', 67.50, 'Home decor - IKEA', '2025-11-18'),
  (target_user_id, 'expense', 'shopping', 234.90, 'Electronics - Best Buy', '2025-11-24'),
  (target_user_id, 'expense', 'shopping', 45.80, 'Books - Amazon', '2025-11-26'),

  -- Health
  (target_user_id, 'expense', 'health', 35.00, 'Gym membership', '2025-11-01'),
  (target_user_id, 'expense', 'health', 25.00, 'Pharmacy - CVS', '2025-11-08'),
  (target_user_id, 'expense', 'health', 150.00, 'Doctor visit copay', '2025-11-15'),
  (target_user_id, 'expense', 'health', 45.60, 'Vitamins and supplements', '2025-11-22'),

  -- Education
  (target_user_id, 'expense', 'education', 199.00, 'Online course - Udemy', '2025-11-03'),
  (target_user_id, 'expense', 'education', 89.99, 'Professional books', '2025-11-12'),
  (target_user_id, 'expense', 'education', 29.99, 'Language learning app', '2025-11-20');

  -- OCTOBER 2025 TRANSACTIONS

  INSERT INTO transactions (user_id, type, category, amount, description, transaction_date) VALUES
  -- Income
  (target_user_id, 'income', 'salary', 5500.00, 'Monthly salary - October', '2025-10-01'),
  (target_user_id, 'income', 'freelance', 3100.00, 'Mobile app project', '2025-10-18'),
  (target_user_id, 'income', 'gift', 500.00, 'Birthday gift', '2025-10-25'),

  -- Expenses (representative sample for October)
  (target_user_id, 'expense', 'groceries', 987.50, 'Groceries - October total', '2025-10-15'),
  (target_user_id, 'expense', 'dining', 523.80, 'Dining out - October', '2025-10-20'),
  (target_user_id, 'expense', 'transport', 456.70, 'Transportation - October', '2025-10-12'),
  (target_user_id, 'expense', 'utilities', 398.20, 'Utilities - October', '2025-10-05'),
  (target_user_id, 'expense', 'entertainment', 289.40, 'Entertainment - October', '2025-10-22'),
  (target_user_id, 'expense', 'shopping', 678.90, 'Shopping - October', '2025-10-28'),
  (target_user_id, 'expense', 'health', 267.30, 'Health - October', '2025-10-10'),
  (target_user_id, 'expense', 'education', 198.20, 'Education - October', '2025-10-16');

  -- SEPTEMBER 2025 TRANSACTIONS

  INSERT INTO transactions (user_id, type, category, amount, description, transaction_date) VALUES
  -- Income
  (target_user_id, 'income', 'salary', 5200.00, 'Monthly salary - September', '2025-09-01'),
  (target_user_id, 'income', 'freelance', 2500.00, 'Consulting project', '2025-09-20'),
  (target_user_id, 'income', 'freelance', 1000.00, 'Logo design', '2025-09-28'),

  -- Expenses
  (target_user_id, 'expense', 'groceries', 1123.40, 'Groceries - September', '2025-09-15'),
  (target_user_id, 'expense', 'dining', 687.90, 'Dining - September', '2025-09-18'),
  (target_user_id, 'expense', 'transport', 512.30, 'Transportation - September', '2025-09-10'),
  (target_user_id, 'expense', 'utilities', 445.60, 'Utilities - September', '2025-09-05'),
  (target_user_id, 'expense', 'entertainment', 398.50, 'Entertainment - September', '2025-09-22'),
  (target_user_id, 'expense', 'shopping', 856.20, 'Shopping - September', '2025-09-25'),
  (target_user_id, 'expense', 'health', 312.80, 'Health - September', '2025-09-12'),
  (target_user_id, 'expense', 'education', 245.30, 'Education - September', '2025-09-08');

  -- AUGUST 2025 TRANSACTIONS

  INSERT INTO transactions (user_id, type, category, amount, description, transaction_date) VALUES
  -- Income
  (target_user_id, 'income', 'salary', 5200.00, 'Monthly salary - August', '2025-08-01'),
  (target_user_id, 'income', 'freelance', 2100.00, 'Website project', '2025-08-15'),
  (target_user_id, 'income', 'other_income', 1000.00, 'Bonus payment', '2025-08-28'),

  -- Expenses
  (target_user_id, 'expense', 'groceries', 1045.70, 'Groceries - August', '2025-08-15'),
  (target_user_id, 'expense', 'dining', 598.40, 'Dining - August', '2025-08-20'),
  (target_user_id, 'expense', 'transport', 487.90, 'Transportation - August', '2025-08-12'),
  (target_user_id, 'expense', 'utilities', 423.50, 'Utilities - August', '2025-08-05'),
  (target_user_id, 'expense', 'entertainment', 356.80, 'Entertainment - August', '2025-08-18'),
  (target_user_id, 'expense', 'shopping', 789.50, 'Shopping - August', '2025-08-25'),
  (target_user_id, 'expense', 'health', 298.20, 'Health - August', '2025-08-10'),
  (target_user_id, 'expense', 'education', 189.90, 'Education - August', '2025-08-22');

  RAISE NOTICE 'Demo transactions seeded successfully for user %', target_user_id;
END;
$$ LANGUAGE plpgsql;

-- Instructions for use:
-- To seed data for a specific user, run:
-- SELECT seed_demo_transactions('your-user-id-here');

-- To seed data for the current authenticated user:
-- SELECT seed_demo_transactions(auth.uid());
