import { Injectable, computed, effect, signal } from '@angular/core';
import {
  Category,
  CategoryTotal,
  Transaction,
  TransactionDraft,
  TransactionFilters,
} from '../models/transaction.model';
import { CATEGORIES } from '../data/categories';

const TRANSACTIONS_KEY = 'budget-tracker:transactions';
const BUDGET_KEY = 'budget-tracker:budget';
const DEFAULT_BUDGET = 1000;

function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    return raw ? (JSON.parse(raw) as Transaction[]) : [];
  } catch {
    return [];
  }
}

function loadBudget(): number {
  const raw = localStorage.getItem(BUDGET_KEY);
  const value = raw ? Number(raw) : DEFAULT_BUDGET;
  return Number.isFinite(value) && value >= 0 ? value : DEFAULT_BUDGET;
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

@Injectable({ providedIn: 'root' })
export class BudgetStoreService {
  private readonly transactions = signal<Transaction[]>(loadTransactions());
  readonly budget = signal<number>(loadBudget());

  readonly filters = signal<TransactionFilters>({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'newest',
  });

  readonly all = this.transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly totalExpenses = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly balance = computed(() => this.totalIncome() - this.totalExpenses());

  readonly savingsRate = computed(() => {
    const income = this.totalIncome();
    return income > 0 ? (this.balance() / income) * 100 : 0;
  });

  readonly budgetProgress = computed(() => {
    const budget = this.budget();
    return budget > 0 ? Math.min((this.totalExpenses() / budget) * 100, 100) : 0;
  });

  readonly budgetRemaining = computed(() => this.budget() - this.totalExpenses());

  readonly expenseBreakdown = computed(() => this.categoryBreakdown('expense'));
  readonly incomeBreakdown = computed(() => this.categoryBreakdown('income'));

  readonly filteredTransactions = computed<Transaction[]>(() => {
    const { search, type, category, sortBy } = this.filters();
    const term = search.trim().toLowerCase();

    const filtered = this.transactions().filter((t) => {
      if (type !== 'all' && t.type !== type) return false;
      if (category !== 'all' && t.category !== category) return false;
      if (term && !t.description.toLowerCase().includes(term)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'amount-high':
          return b.amount - a.amount;
        case 'amount-low':
          return a.amount - b.amount;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  });

  constructor() {
    effect(() => {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(this.transactions()));
    });
    effect(() => {
      localStorage.setItem(BUDGET_KEY, String(this.budget()));
    });
  }

  addTransaction(draft: TransactionDraft): void {
    const transaction: Transaction = {
      id: createId(),
      description: draft.description.trim(),
      amount: draft.amount,
      type: draft.type,
      category: draft.category,
      createdAt: new Date().toISOString(),
    };
    this.transactions.update((list) => [transaction, ...list]);
  }

  updateTransaction(id: string, updates: Partial<Transaction>): void {
    this.transactions.update((list) => list.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }

  deleteTransaction(id: string): void {
    this.transactions.update((list) => list.filter((t) => t.id !== id));
  }

  setBudget(value: number): void {
    if (Number.isFinite(value) && value >= 0) {
      this.budget.set(value);
    }
  }

  clearAll(): void {
    this.transactions.set([]);
  }

  private categoryBreakdown(type: 'expense' | 'income'): CategoryTotal[] {
    const total = type === 'expense' ? this.totalExpenses() : this.totalIncome();
    const transactions = this.transactions().filter((t) => t.type === type);

    return (CATEGORIES[type] as Category[]).map((category) => {
      const categoryTotal = transactions.filter((t) => t.category === category).reduce((sum, t) => sum + t.amount, 0);
      return {
        category,
        total: categoryTotal,
        percentage: total > 0 ? (categoryTotal / total) * 100 : 0,
      };
    });
  }
}
