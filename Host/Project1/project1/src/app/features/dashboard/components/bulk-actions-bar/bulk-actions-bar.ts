import { Component, inject, signal } from '@angular/core';
import { TaskStoreService } from '../../../../core/services/task-store.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-bulk-actions-bar',
  imports: [ConfirmDialog],
  templateUrl: './bulk-actions-bar.html',
  styleUrl: './bulk-actions-bar.scss',
})
export class BulkActionsBar {
  protected readonly store = inject(TaskStoreService);
  private readonly toast = inject(ToastService);

  protected readonly confirmOpen = signal(false);

  complete(): void {
    this.store.bulkComplete(true);
    this.toast.success('Marked selected tasks complete.');
  }

  incomplete(): void {
    this.store.bulkComplete(false);
    this.toast.success('Marked selected tasks incomplete.');
  }

  askDelete(): void {
    this.confirmOpen.set(true);
  }

  confirmDelete(): void {
    this.store.bulkDelete();
    this.confirmOpen.set(false);
    this.toast.success('Selected tasks deleted.');
  }

  cancel(): void {
    this.store.clearSelection();
  }
}
