import { Category, ExpenseCategory, IncomeCategory, TransactionType } from '../models/transaction.model';

export const CATEGORIES: Record<TransactionType, Category[]> = {
  expense: ['food', 'shopping', 'entertainment', 'transport', 'bills'],
  income: ['salary', 'freelance', 'investment', 'gift'],
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: '#ef4444',
  shopping: '#f59e0b',
  entertainment: '#8b5cf6',
  transport: '#06b6d4',
  bills: '#64748b',
  salary: '#10b981',
  freelance: '#84cc16',
  investment: '#6366f1',
  gift: '#ec4899',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  food: 'fa-solid fa-utensils',
  shopping: 'fa-solid fa-bag-shopping',
  entertainment: 'fa-solid fa-film',
  transport: 'fa-solid fa-car',
  bills: 'fa-solid fa-file-invoice-dollar',
  salary: 'fa-solid fa-briefcase',
  freelance: 'fa-solid fa-laptop-code',
  investment: 'fa-solid fa-chart-line',
  gift: 'fa-solid fa-gift',
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = CATEGORIES.expense as ExpenseCategory[];
export const INCOME_CATEGORIES: IncomeCategory[] = CATEGORIES.income as IncomeCategory[];
