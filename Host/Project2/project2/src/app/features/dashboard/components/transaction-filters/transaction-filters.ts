import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BudgetStoreService } from '../../../../core/services/budget-store.service';
import { CATEGORIES } from '../../../../core/data/categories';
import { Category, SortOption, TransactionType } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-filters.html',
  styleUrl: './transaction-filters.scss',
})
export class TransactionFilters {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(BudgetStoreService);

  protected readonly form = this.fb.nonNullable.group({
    search: [''],
    type: ['all' as TransactionType | 'all'],
    category: ['all' as Category | 'all'],
    sortBy: ['newest' as SortOption],
  });

  protected readonly categoryOptions = computed(() => {
    const type = this.form.controls.type.value;
    if (type === 'all') return [...CATEGORIES.expense, ...CATEGORIES.income];
    return CATEGORIES[type];
  });

  constructor() {
    this.form.controls.type.valueChanges.subscribe(() => this.form.controls.category.setValue('all'));

    this.form.valueChanges.subscribe((value) => {
      this.store.filters.set({
        search: value.search ?? '',
        type: value.type ?? 'all',
        category: value.category ?? 'all',
        sortBy: value.sortBy ?? 'newest',
      });
    });
  }
}
