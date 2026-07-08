import { Injectable, computed, effect, signal } from '@angular/core';
import { CategoryStat, Task, TaskCategory, TaskDraft, TaskFilters, TaskStats } from '../models/task.model';
import { CATEGORIES } from '../data/categories';
import { PRIORITY_ORDER } from '../data/priorities';

const STORAGE_KEY = 'task-manager:tasks';

function loadFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private readonly tasks = signal<Task[]>(loadFromStorage());

  readonly filters = signal<TaskFilters>({
    category: 'all',
    priority: 'all',
    completed: 'all',
    search: '',
    sortBy: 'createdAt',
  });

  readonly selectedIds = signal<Set<string>>(new Set());
  readonly editingId = signal<string | null>(null);

  readonly all = this.tasks.asReadonly();

  readonly stats = computed<TaskStats>(() => {
    const tasks = this.tasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const overdueTasks = tasks.filter(
      (task) => task.dueDate && new Date(task.dueDate) < new Date() && !task.completed,
    ).length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const categoryStats: CategoryStat[] = CATEGORIES.map((category) => ({
      category,
      total: tasks.filter((task) => task.category === category).length,
      completed: tasks.filter((task) => task.category === category && task.completed).length,
    }));

    return { totalTasks, completedTasks, overdueTasks, completionRate, categoryStats };
  });

  readonly filteredTasks = computed<Task[]>(() => {
    const { category, priority, completed, search, sortBy } = this.filters();
    const term = search.trim().toLowerCase();

    const filtered = this.tasks().filter((task) => {
      if (category !== 'all' && task.category !== category) return false;
      if (priority !== 'all' && task.priority !== priority) return false;
      if (completed !== 'all' && task.completed !== (completed === 'true')) return false;

      if (term) {
        const inTitle = task.title.toLowerCase().includes(term);
        const inDescription = task.description.toLowerCase().includes(term);
        const inTags = task.tags.some((tag) => tag.toLowerCase().includes(term));
        if (!inTitle && !inDescription && !inTags) return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
    });
  }

  addTask(draft: TaskDraft): void {
    const now = new Date().toISOString();
    const task: Task = {
      id: createId(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      category: draft.category,
      priority: draft.priority,
      dueDate: draft.dueDate,
      tags: draft.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.update((list) => [task, ...list]);
  }

  updateTask(id: string, updates: Partial<Task>): void {
    this.tasks.update((list) =>
      list.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task)),
    );
  }

  deleteTask(id: string): void {
    this.tasks.update((list) => list.filter((task) => task.id !== id));
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      next.delete(id);
      return next;
    });
  }

  toggleSelection(id: string): void {
    this.selectedIds.update((selected) => {
      const next = new Set(selected);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  selectAll(ids: string[]): void {
    const allSelected = ids.length > 0 && ids.every((id) => this.selectedIds().has(id));
    this.selectedIds.set(allSelected ? new Set() : new Set(ids));
  }

  clearSelection(): void {
    this.selectedIds.set(new Set());
  }

  bulkComplete(completed: boolean): void {
    const ids = this.selectedIds();
    this.tasks.update((list) =>
      list.map((task) => (ids.has(task.id) ? { ...task, completed, updatedAt: new Date().toISOString() } : task)),
    );
  }

  bulkDelete(): void {
    const ids = this.selectedIds();
    this.tasks.update((list) => list.filter((task) => !ids.has(task.id)));
    this.clearSelection();
  }

  categoryHasTasks(category: TaskCategory): boolean {
    return this.tasks().some((task) => task.category === category);
  }
}
