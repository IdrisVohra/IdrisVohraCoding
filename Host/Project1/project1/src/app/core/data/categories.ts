import { TaskCategory } from '../models/task.model';

export const CATEGORIES: TaskCategory[] = ['work', 'personal', 'shopping', 'health', 'education', 'finance'];

export const CATEGORY_ICONS: Record<TaskCategory, string> = {
  work: 'fa-solid fa-briefcase',
  personal: 'fa-solid fa-user',
  shopping: 'fa-solid fa-cart-shopping',
  health: 'fa-solid fa-heart-pulse',
  education: 'fa-solid fa-graduation-cap',
  finance: 'fa-solid fa-sack-dollar',
};
