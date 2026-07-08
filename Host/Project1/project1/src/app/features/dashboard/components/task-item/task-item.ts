import { Component, computed, inject, input } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskStoreService } from '../../../../core/services/task-store.service';
import { PRIORITIES } from '../../../../core/data/priorities';
import { CATEGORY_ICONS } from '../../../../core/data/categories';
import { RelativeDatePipe } from '../../../../shared/pipes/relative-date.pipe';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';

@Component({
  selector: 'app-task-item',
  imports: [RelativeDatePipe, AutofocusDirective],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  readonly task = input.required<Task>();

  protected readonly store = inject(TaskStoreService);
  protected readonly priorities = PRIORITIES;
  protected readonly categoryIcons = CATEGORY_ICONS;

  protected readonly isSelected = computed(() => this.store.selectedIds().has(this.task().id));
  protected readonly isEditing = computed(() => this.store.editingId() === this.task().id);
  protected readonly isOverdue = computed(() => {
    const task = this.task();
    return !!task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  });

  toggleSelect(): void {
    this.store.toggleSelection(this.task().id);
  }

  toggleComplete(): void {
    this.store.updateTask(this.task().id, { completed: !this.task().completed });
  }

  startEdit(): void {
    this.store.editingId.set(this.isEditing() ? null : this.task().id);
  }

  saveTitle(value: string): void {
    const trimmed = value.trim();
    if (trimmed) {
      this.store.updateTask(this.task().id, { title: trimmed });
    }
    this.store.editingId.set(null);
  }

  remove(): void {
    this.store.deleteTask(this.task().id);
  }
}
