export type TransactionType = 'income' | 'expense';

export type ExpenseCategory = 'food' | 'shopping' | 'entertainment' | 'transport' | 'bills';
export type IncomeCategory = 'salary' | 'freelance' | 'investment' | 'gift';
export type Category = ExpenseCategory | IncomeCategory;

export type SortOption = 'newest' | 'oldest' | 'amount-high' | 'amount-low';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  createdAt: string;
}

export type TransactionDraft = {
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
};

export interface TransactionFilters {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: SortOption;
}

export interface CategoryTotal {
  category: Category;
  total: number;
  percentage: number;
}
