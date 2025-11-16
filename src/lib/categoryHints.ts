// Simple keyword-to-category mapping for smart hints
export const expenseCategoryHints: Record<string, string> = {
  // Groceries
  'tesco': 'groceries',
  'lidl': 'groceries',
  'aldi': 'groceries',
  'sainsbury': 'groceries',
  'asda': 'groceries',
  'morrisons': 'groceries',
  'waitrose': 'groceries',
  'marks': 'groceries',
  'spencer': 'groceries',
  'food': 'groceries',
  'supermarket': 'groceries',
  'grocery': 'groceries',

  // Dining
  'restaurant': 'dining',
  'cafe': 'dining',
  'coffee': 'dining',
  'starbucks': 'dining',
  'costa': 'dining',
  'mcdonald': 'dining',
  'kfc': 'dining',
  'pizza': 'dining',
  'takeaway': 'dining',
  'uber eats': 'dining',
  'deliveroo': 'dining',
  'dinner': 'dining',
  'lunch': 'dining',

  // Transport
  'uber': 'transport',
  'taxi': 'transport',
  'bus': 'transport',
  'train': 'transport',
  'fuel': 'transport',
  'petrol': 'transport',
  'diesel': 'transport',
  'parking': 'transport',
  'oyster': 'transport',

  // Utilities
  'electric': 'utilities',
  'water': 'utilities',
  'gas': 'utilities',
  'internet': 'utilities',
  'broadband': 'utilities',
  'phone': 'utilities',
  'bill': 'utilities',

  // Entertainment
  'netflix': 'entertainment',
  'spotify': 'entertainment',
  'cinema': 'entertainment',
  'movie': 'entertainment',
  'concert': 'entertainment',
  'game': 'entertainment',
  'steam': 'entertainment',

  // Shopping
  'amazon': 'shopping',
  'ebay': 'shopping',
  'clothes': 'shopping',
  'shoes': 'shopping',
  'primark': 'shopping',
  'zara': 'shopping',
  'h&m': 'shopping',
};

export const incomeCategoryHints: Record<string, string> = {
  'salary': 'salary',
  'wage': 'salary',
  'payroll': 'salary',
  'paycheck': 'salary',

  'freelance': 'freelance',
  'contract': 'freelance',
  'project': 'freelance',
  'consulting': 'freelance',

  'gift': 'gift',
  'birthday': 'gift',
  'present': 'gift',
};

export function suggestCategory(description: string, type: 'income' | 'expense'): string | null {
  if (!description || description.length < 3) return null;

  const hints = type === 'income' ? incomeCategoryHints : expenseCategoryHints;
  const lowerDesc = description.toLowerCase();

  // Find first matching keyword
  for (const [keyword, category] of Object.entries(hints)) {
    if (lowerDesc.includes(keyword)) {
      return category;
    }
  }

  return null;
}

export function getCategoryLabel(category: string, type: 'income' | 'expense'): string {
  const labels: Record<string, string> = {
    // Expense categories
    'groceries': 'Groceries',
    'dining': 'Dining Out',
    'transport': 'Transportation',
    'utilities': 'Utilities',
    'entertainment': 'Entertainment',
    'shopping': 'Shopping',
    'health': 'Healthcare',
    'education': 'Education',
    'other_expense': 'Other',

    // Income categories
    'salary': 'Salary',
    'freelance': 'Freelance',
    'gift': 'Gift',
    'other_income': 'Other Income',
  };

  return labels[category] || category;
}
