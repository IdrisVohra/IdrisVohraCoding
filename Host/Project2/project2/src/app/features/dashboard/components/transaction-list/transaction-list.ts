import { Component, inject, signal } from '@angular/core';
import { BudgetStoreService } from '../../../../core/services/budget-store.service';
import { ToastService } from '../../../../core/services/toast.service';
import { TransactionItem } from '../transaction-item/transaction-item';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionItem, ConfirmDialog],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList {
  protected readonly store = inject(BudgetStoreService);
  private readonly toast = inject(ToastService);

  protected readonly editingId = signal<string | null>(null);
  protected readonly pendingDeleteId = signal<string | null>(null);

  startEdit(id: string): void {
    this.editingId.update((current) => (current === id ? null : id));
  }

  saveEdit(event: { id: string; description: string }): void {
    this.store.updateTransaction(event.id, { description: event.description });
    this.editingId.set(null);
  }

  askDelete(id: string): void {
    this.pendingDeleteId.set(id);
  }

  confirmDelete(): void {
    const id = this.pendingDeleteId();
    if (!id) return;
    this.store.deleteTransaction(id);
    this.pendingDeleteId.set(null);
    this.toast.success('Transaction deleted.');
  }
}
