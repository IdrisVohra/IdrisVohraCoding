import { Component } from '@angular/core';
import { StatsOverview } from './components/stats-overview/stats-overview';
import { TaskForm } from './components/task-form/task-form';
import { TaskFilters } from './components/task-filters/task-filters';
import { BulkActionsBar } from './components/bulk-actions-bar/bulk-actions-bar';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-dashboard',
  imports: [StatsOverview, TaskForm, TaskFilters, BulkActionsBar, TaskList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
