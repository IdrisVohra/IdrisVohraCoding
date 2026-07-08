import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetStoreService } from '../../../../core/services/budget-store.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CATEGORIES, CATEGORY_ICONS } from '../../../../core/data/categories';
import { Category, TransactionType } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(BudgetStoreService);
  private readonly toast = inject(ToastService);

  protected readonly categoryIcons = CATEGORY_ICONS;

  protected readonly form = this.fb.nonNullable.group({
    description: ['', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    type: ['expense' as TransactionType, Validators.required],
    category: ['food' as Category, Validators.required],
  });

  private readonly typeSignal = signal<TransactionType>('expense');

  protected readonly categoryOptions = computed(() => CATEGORIES[this.typeSignal()]);

  constructor() {
    this.form.controls.type.valueChanges.subscribe((type) => {
      this.typeSignal.set(type);
      this.form.controls.category.setValue(CATEGORIES[type][0]);
    });
  }

  get descriptionInvalid(): boolean {
    const control = this.form.controls.description;
    return control.invalid && control.touched;
  }

  get amountInvalid(): boolean {
    const control = this.form.controls.amount;
    return control.invalid && control.touched;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    this.store.addTransaction({
      description: raw.description,
      amount: raw.amount!,
      type: raw.type,
      category: raw.category,
    });
    this.toast.success(`${raw.type === 'income' ? 'Income' : 'Expense'} added.`);

    this.form.reset({
      description: '',
      amount: null,
      type: raw.type,
      category: raw.category,
    });
  }
}
