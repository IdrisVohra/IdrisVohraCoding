import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-bar',
  template: `
    @if (loading.isLoading()) {
      <div class="loading-bar" aria-hidden="true"></div>
    }
  `,
  styleUrl: './loading-bar.scss',
})
export class LoadingBar {
  protected readonly loading = inject(LoadingService);
}
