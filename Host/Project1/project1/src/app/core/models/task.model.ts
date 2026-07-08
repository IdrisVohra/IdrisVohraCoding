export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'education' | 'finance';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SortOption = 'createdAt' | 'priority' | 'dueDate' | 'title';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskDraft = {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  tags: string;
};

export interface TaskFilters {
  category: TaskCategory | 'all';
  priority: TaskPriority | 'all';
  completed: 'all' | 'true' | 'false';
  search: string;
  sortBy: SortOption;
}

export interface CategoryStat {
  category: TaskCategory;
  total: number;
  completed: number;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
  categoryStats: CategoryStat[];
}
