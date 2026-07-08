import { Component, inject } from '@angular/core';
import { TaskStoreService } from '../../../../core/services/task-store.service';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';
import { CATEGORY_ICONS } from '../../../../core/data/categories';

@Component({
  selector: 'app-stats-overview',
  imports: [StatCard],
  templateUrl: './stats-overview.html',
  styleUrl: './stats-overview.scss',
})
export class StatsOverview {
  protected readonly store = inject(TaskStoreService);
  protected readonly categoryIcons = CATEGORY_ICONS;
}
