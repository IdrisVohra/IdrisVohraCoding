import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RentalService } from '../../core/services/rental.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';

@Component({
  selector: 'app-trips',
  imports: [ConfirmDialog, DurationPipe, PhoneFormatPipe, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './trips.html',
  styleUrl: './trips.scss',
})
export class Trips implements OnInit {
  private readonly rentalService = inject(RentalService);
  private readonly toast = inject(ToastService);

  protected readonly rentals = this.rentalService.all;
  protected readonly isLoading = signal(true);
  protected readonly pendingDeleteId = signal<number | null>(null);

  protected readonly totalRevenue = computed(() =>
    this.rentals().reduce((sum, rental) => sum + (rental.totalTripCharges || 0), 0),
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.rentalService.fetchAll().pipe(finalize(() => this.isLoading.set(false))).subscribe();
  }

  askDelete(id: number): void {
    this.pendingDeleteId.set(id);
  }

  cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  confirmDelete(): void {
    const id = this.pendingDeleteId();
    if (id == null) {
      return;
    }
    this.rentalService.remove(id).subscribe({
      next: () => {
        this.toast.success('Trip removed.');
        this.pendingDeleteId.set(null);
      },
      error: () => this.pendingDeleteId.set(null),
    });
  }
}
