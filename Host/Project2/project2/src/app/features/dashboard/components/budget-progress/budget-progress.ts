import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetStoreService } from '../../../../core/services/budget-store.service';

@Component({
  selector: 'app-budget-progress',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './budget-progress.html',
  styleUrl: './budget-progress.scss',
})
export class BudgetProgress {
  protected readonly store = inject(BudgetStoreService);

  protected readonly budgetControl = new FormControl(this.store.budget(), {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0)],
  });

  constructor() {
    effect(() => this.budgetControl.setValue(this.store.budget(), { emitEvent: false }));

    this.budgetControl.valueChanges.subscribe((value) => {
      if (this.budgetControl.valid) {
        this.store.setBudget(value);
      }
    });
  }

  protected get statusClass(): string {
    const progress = this.store.budgetProgress();
    if (progress >= 100) return 'danger';
    if (progress >= 80) return 'warning';
    return 'success';
  }
}
