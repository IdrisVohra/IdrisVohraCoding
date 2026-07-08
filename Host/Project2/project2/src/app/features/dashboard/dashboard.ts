import { Component, inject, signal } from '@angular/core';
import { OverviewCards } from './components/overview-cards/overview-cards';
import { BudgetProgress } from './components/budget-progress/budget-progress';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { CategoryBreakdown } from './components/category-breakdown/category-breakdown';
import { TransactionFilters } from './components/transaction-filters/transaction-filters';
import { TransactionList } from './components/transaction-list/transaction-list';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { BudgetStoreService } from '../../core/services/budget-store.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    OverviewCards,
    BudgetProgress,
    TransactionForm,
    CategoryBreakdown,
    TransactionFilters,
    TransactionList,
    ConfirmDialog,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly store = inject(BudgetStoreService);
  private readonly toast = inject(ToastService);

  protected readonly confirmClearOpen = signal(false);

  askClearAll(): void {
    this.confirmClearOpen.set(true);
  }

  confirmClearAll(): void {
    this.store.clearAll();
    this.confirmClearOpen.set(false);
    this.toast.success('All transactions cleared.');
  }
}
