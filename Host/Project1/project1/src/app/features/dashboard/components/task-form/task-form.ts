import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStoreService } from '../../../../core/services/task-store.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CATEGORIES } from '../../../../core/data/categories';
import { PRIORITIES } from '../../../../core/data/priorities';
import { TaskCategory, TaskPriority } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(TaskStoreService);
  private readonly toast = inject(ToastService);

  protected readonly categories = CATEGORIES;
  protected readonly priorities = Object.entries(PRIORITIES) as [TaskPriority, { label: string; color: string }][];

  protected readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    category: ['work' as TaskCategory, Validators.required],
    priority: ['medium' as TaskPriority, Validators.required],
    dueDate: [''],
    tags: [''],
  });

  get titleInvalid(): boolean {
    const control = this.form.controls.title;
    return control.invalid && control.touched;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.store.addTask(this.form.getRawValue());
    this.toast.success('Task added.');
    this.form.reset({
      title: '',
      description: '',
      category: this.form.value.category ?? 'work',
      priority: 'medium',
      dueDate: '',
      tags: '',
    });
  }
}
