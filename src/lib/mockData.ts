import { Transaction } from "@/contexts/TransactionsContext";

/**
 * Generate realistic mock transaction data for demo mode
 * Creates transactions for the last 4 months with varied categories and amounts
 */
export function generateMockTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Income categories and typical amounts
  const incomeCategories = [
    { category: "salary", amounts: [3200, 3500, 3800] },
    { category: "freelance", amounts: [450, 780, 1200] },
    { category: "investment", amounts: [120, 250, 380] },
    { category: "other_income", amounts: [50, 100, 200] },
  ];

  // Expense categories with typical amounts
  const expenseCategories = [
    { category: "groceries", amounts: [45, 67, 89, 120, 156] },
    { category: "dining", amounts: [25, 35, 48, 65] },
    { category: "transportation", amounts: [15, 30, 45, 60] },
    { category: "utilities", amounts: [85, 120, 150] },
    { category: "entertainment", amounts: [20, 40, 60, 80] },
    { category: "healthcare", amounts: [30, 75, 150] },
    { category: "shopping", amounts: [40, 80, 120, 200] },
    { category: "bills", amounts: [50, 100, 150] },
    { category: "education", amounts: [35, 70, 120] },
    { category: "other", amounts: [20, 40, 60] },
  ];

  let idCounter = 1;

  // Generate data for last 4 months
  for (let monthOffset = 0; monthOffset < 4; monthOffset++) {
    const transactionMonth = currentMonth - monthOffset;
    const transactionYear = transactionMonth < 0 ? currentYear - 1 : currentYear;
    const adjustedMonth = transactionMonth < 0 ? 12 + transactionMonth : transactionMonth;

    // Add monthly salary (always on the 1st)
    const salaryDate = new Date(transactionYear, adjustedMonth, 1);
    transactions.push({
      id: `demo-${idCounter++}`,
      user_id: "demo-user",
      type: "income",
      category: "salary",
      amount: incomeCategories[0].amounts[monthOffset % 3],
      description: "Monthly salary",
      transaction_date: salaryDate.toISOString().split("T")[0],
      created_at: salaryDate.toISOString(),
      updated_at: salaryDate.toISOString(),
    });

    // Add 1-2 freelance income entries per month (random days)
    const freelanceCount = monthOffset === 0 ? 2 : 1;
    for (let i = 0; i < freelanceCount; i++) {
      const day = 5 + i * 12;
      const freelanceDate = new Date(transactionYear, adjustedMonth, day);
      transactions.push({
        id: `demo-${idCounter++}`,
        user_id: "demo-user",
        type: "income",
        category: "freelance",
        amount: incomeCategories[1].amounts[i % 3],
        description: `Freelance project ${monthOffset === 0 ? "Alpha" : "Beta"}`,
        transaction_date: freelanceDate.toISOString().split("T")[0],
        created_at: freelanceDate.toISOString(),
        updated_at: freelanceDate.toISOString(),
      });
    }

    // Add investment income (quarterly - months 0 and 3)
    if (monthOffset === 0 || monthOffset === 3) {
      const investmentDate = new Date(transactionYear, adjustedMonth, 15);
      transactions.push({
        id: `demo-${idCounter++}`,
        user_id: "demo-user",
        type: "income",
        category: "investment",
        amount: incomeCategories[2].amounts[monthOffset === 0 ? 2 : 1],
        description: "Dividend payment",
        transaction_date: investmentDate.toISOString().split("T")[0],
        created_at: investmentDate.toISOString(),
        updated_at: investmentDate.toISOString(),
      });
    }

    // Generate realistic expenses throughout the month
    const daysInMonth = new Date(transactionYear, adjustedMonth + 1, 0).getDate();

    // Groceries - 2-3 times per month
    const groceryDays = [5, 12, 19, 26].slice(0, 2 + (monthOffset % 2));
    groceryDays.forEach((day, idx) => {
      if (day <= daysInMonth) {
        const groceryDate = new Date(transactionYear, adjustedMonth, day);
        transactions.push({
          id: `demo-${idCounter++}`,
          user_id: "demo-user",
          type: "expense",
          category: "groceries",
          amount: expenseCategories[0].amounts[idx % expenseCategories[0].amounts.length],
          description: "Weekly groceries",
          transaction_date: groceryDate.toISOString().split("T")[0],
          created_at: groceryDate.toISOString(),
          updated_at: groceryDate.toISOString(),
        });
      }
    });

    // Dining - 3-5 times per month
    const diningDays = [3, 8, 14, 20, 27];
    diningDays.slice(0, 3 + (monthOffset % 3)).forEach((day, idx) => {
      if (day <= daysInMonth) {
        const diningDate = new Date(transactionYear, adjustedMonth, day);
        transactions.push({
          id: `demo-${idCounter++}`,
          user_id: "demo-user",
          type: "expense",
          category: "dining",
          amount: expenseCategories[1].amounts[idx % expenseCategories[1].amounts.length],
          description: idx % 2 === 0 ? "Lunch" : "Dinner out",
          transaction_date: diningDate.toISOString().split("T")[0],
          created_at: diningDate.toISOString(),
          updated_at: diningDate.toISOString(),
        });
      }
    });

    // Transportation - weekly
    const transportDays = [4, 11, 18, 25];
    transportDays.forEach((day, idx) => {
      if (day <= daysInMonth) {
        const transportDate = new Date(transactionYear, adjustedMonth, day);
        transactions.push({
          id: `demo-${idCounter++}`,
          user_id: "demo-user",
          type: "expense",
          category: "transportation",
          amount: expenseCategories[2].amounts[idx % expenseCategories[2].amounts.length],
          description: "Gas / Public transport",
          transaction_date: transportDate.toISOString().split("T")[0],
          created_at: transportDate.toISOString(),
          updated_at: transportDate.toISOString(),
        });
      }
    });

    // Monthly bills - utilities (around 5th of month)
    if (5 <= daysInMonth) {
      const utilityDate = new Date(transactionYear, adjustedMonth, 5);
      transactions.push({
        id: `demo-${idCounter++}`,
        user_id: "demo-user",
        type: "expense",
        category: "utilities",
        amount: expenseCategories[3].amounts[monthOffset % 3],
        description: "Electricity & Water",
        transaction_date: utilityDate.toISOString().split("T")[0],
        created_at: utilityDate.toISOString(),
        updated_at: utilityDate.toISOString(),
      });
    }

    // Entertainment - 2-3 times per month
    const entertainmentDays = [7, 16, 23];
    entertainmentDays.slice(0, 2 + (monthOffset % 2)).forEach((day, idx) => {
      if (day <= daysInMonth) {
        const entertainmentDate = new Date(transactionYear, adjustedMonth, day);
        const descriptions = ["Movie tickets", "Concert", "Streaming services"];
        transactions.push({
          id: `demo-${idCounter++}`,
          user_id: "demo-user",
          type: "expense",
          category: "entertainment",
          amount: expenseCategories[4].amounts[idx % expenseCategories[4].amounts.length],
          description: descriptions[idx % descriptions.length],
          transaction_date: entertainmentDate.toISOString().split("T")[0],
          created_at: entertainmentDate.toISOString(),
          updated_at: entertainmentDate.toISOString(),
        });
      }
    });

    // Shopping - 1-2 times per month
    const shoppingDays = [10, 22];
    shoppingDays.slice(0, 1 + (monthOffset % 2)).forEach((day, idx) => {
      if (day <= daysInMonth) {
        const shoppingDate = new Date(transactionYear, adjustedMonth, day);
        const descriptions = ["Clothing", "Electronics", "Home goods"];
        transactions.push({
          id: `demo-${idCounter++}`,
          user_id: "demo-user",
          type: "expense",
          category: "shopping",
          amount: expenseCategories[6].amounts[idx % expenseCategories[6].amounts.length],
          description: descriptions[idx % descriptions.length],
          transaction_date: shoppingDate.toISOString().split("T")[0],
          created_at: shoppingDate.toISOString(),
          updated_at: shoppingDate.toISOString(),
        });
      }
    });

    // Healthcare - occasional
    if (monthOffset === 1) {
      const healthDate = new Date(transactionYear, adjustedMonth, 13);
      transactions.push({
        id: `demo-${idCounter++}`,
        user_id: "demo-user",
        type: "expense",
        category: "healthcare",
        amount: expenseCategories[5].amounts[1],
        description: "Doctor visit",
        transaction_date: healthDate.toISOString().split("T")[0],
        created_at: healthDate.toISOString(),
        updated_at: healthDate.toISOString(),
      });
    }
  }

  // Sort by date (newest first)
  return transactions.sort((a, b) =>
    new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
  );
}

/**
 * Get a stable instance of mock transactions
 * Useful for consistent demo experience
 */
let cachedMockTransactions: Transaction[] | null = null;

export function getMockTransactions(): Transaction[] {
  if (!cachedMockTransactions) {
    cachedMockTransactions = generateMockTransactions();
  }
  return cachedMockTransactions;
}
