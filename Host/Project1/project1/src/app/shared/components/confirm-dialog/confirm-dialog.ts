import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  readonly open = input(false);
  readonly dialogTitle = input('Are you sure?');
  readonly message = input('This action cannot be undone.');
  readonly confirmLabel = input('Delete');

  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
