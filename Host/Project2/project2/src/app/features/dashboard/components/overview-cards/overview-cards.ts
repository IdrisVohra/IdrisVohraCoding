import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BudgetStoreService } from '../../../../core/services/budget-store.service';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';

@Component({
  selector: 'app-overview-cards',
  imports: [StatCard, CurrencyPipe, DecimalPipe],
  templateUrl: './overview-cards.html',
  styleUrl: './overview-cards.scss',
})
export class OverviewCards {
  protected readonly store = inject(BudgetStoreService);
}
