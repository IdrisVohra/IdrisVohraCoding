import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BudgetStoreService } from '../../../../core/services/budget-store.service';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../../core/data/categories';
import { TransactionType } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-category-breakdown',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './category-breakdown.html',
  styleUrl: './category-breakdown.scss',
})
export class CategoryBreakdown {
  protected readonly store = inject(BudgetStoreService);
  protected readonly categoryColors = CATEGORY_COLORS;
  protected readonly categoryIcons = CATEGORY_ICONS;

  protected readonly activeTab = signal<TransactionType>('expense');

  protected get breakdown() {
    return this.activeTab() === 'expense' ? this.store.expenseBreakdown() : this.store.incomeBreakdown();
  }

  protected get total() {
    return this.activeTab() === 'expense' ? this.store.totalExpenses() : this.store.totalIncome();
  }

  setTab(tab: TransactionType): void {
    this.activeTab.set(tab);
  }
}
