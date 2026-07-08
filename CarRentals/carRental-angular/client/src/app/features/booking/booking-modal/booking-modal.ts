import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingStore } from '../booking-store';

@Component({
  selector: 'app-booking-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-modal.html',
  styleUrl: './booking-modal.scss',
})
export class BookingModal {
  protected readonly store = inject(BookingStore);

  isInvalid(controlName: keyof typeof this.store.reservationForm.controls): boolean {
    const control = this.store.reservationForm.controls[controlName];
    return control.invalid && control.touched;
  }

  submit(): void {
    this.store.confirmBooking();
  }

  close(): void {
    this.store.closeModal();
  }
}
