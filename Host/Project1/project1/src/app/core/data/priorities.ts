import { TaskPriority } from '../models/task.model';

export interface PriorityMeta {
  label: string;
  color: string;
}

export const PRIORITIES: Record<TaskPriority, PriorityMeta> = {
  low: { color: '#10b981', label: 'Low' },
  medium: { color: '#f59e0b', label: 'Medium' },
  high: { color: '#ef4444', label: 'High' },
  urgent: { color: '#dc2626', label: 'Urgent' },
};

export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
};
