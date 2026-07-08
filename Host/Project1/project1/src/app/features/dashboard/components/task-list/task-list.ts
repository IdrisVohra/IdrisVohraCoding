import { Component, inject } from '@angular/core';
import { TaskStoreService } from '../../../../core/services/task-store.service';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  protected readonly store = inject(TaskStoreService);

  get allSelected(): boolean {
    const ids = this.store.filteredTasks().map((task) => task.id);
    return ids.length > 0 && ids.every((id) => this.store.selectedIds().has(id));
  }

  selectAll(): void {
    this.store.selectAll(this.store.filteredTasks().map((task) => task.id));
  }
}
