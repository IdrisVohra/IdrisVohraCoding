import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskStoreService } from '../../../../core/services/task-store.service';
import { CATEGORIES } from '../../../../core/data/categories';
import { PRIORITIES } from '../../../../core/data/priorities';
import { TaskCategory, TaskPriority, SortOption } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './task-filters.html',
  styleUrl: './task-filters.scss',
})
export class TaskFilters {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(TaskStoreService);

  protected readonly categories = CATEGORIES;
  protected readonly priorities = Object.entries(PRIORITIES) as [TaskPriority, { label: string; color: string }][];

  protected readonly form = this.fb.nonNullable.group({
    search: [''],
    category: ['all' as TaskCategory | 'all'],
    priority: ['all' as TaskPriority | 'all'],
    completed: ['all' as 'all' | 'true' | 'false'],
    sortBy: ['createdAt' as SortOption],
  });

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      this.store.filters.set({
        search: value.search ?? '',
        category: value.category ?? 'all',
        priority: value.priority ?? 'all',
        completed: value.completed ?? 'all',
        sortBy: value.sortBy ?? 'createdAt',
      });
    });
  }
}
