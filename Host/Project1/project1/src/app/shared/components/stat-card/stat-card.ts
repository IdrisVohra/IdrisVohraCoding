import { Component, input } from '@angular/core';

export type StatVariant = 'total' | 'completed' | 'overdue' | 'progress';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly variant = input<StatVariant>('total');
}
