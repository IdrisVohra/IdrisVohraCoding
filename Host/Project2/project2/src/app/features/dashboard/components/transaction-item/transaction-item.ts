import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Transaction } from '../../../../core/models/transaction.model';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../../core/data/categories';
import { RelativeDatePipe } from '../../../../shared/pipes/relative-date.pipe';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';

@Component({
  selector: 'app-transaction-item',
  imports: [CurrencyPipe, RelativeDatePipe, AutofocusDirective],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  readonly transaction = input.required<Transaction>();
  readonly editingId = input<string | null>(null);

  readonly startEdit = output<string>();
  readonly saveEdit = output<{ id: string; description: string }>();
  readonly remove = output<string>();

  protected readonly categoryColors = CATEGORY_COLORS;
  protected readonly categoryIcons = CATEGORY_ICONS;

  protected readonly isEditing = computed(() => this.editingId() === this.transaction().id);

  onSave(value: string): void {
    const trimmed = value.trim();
    this.saveEdit.emit({ id: this.transaction().id, description: trimmed || this.transaction().description });
  }
}
