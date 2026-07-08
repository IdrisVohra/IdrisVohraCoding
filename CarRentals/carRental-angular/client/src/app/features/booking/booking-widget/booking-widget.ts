import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingStore } from '../booking-store';

@Component({
  selector: 'app-booking-widget',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-widget.html',
  styleUrl: './booking-widget.scss',
})
export class BookingWidget {
  protected readonly store = inject(BookingStore);

  protected readonly carModels = this.store.cars;

  submit(): void {
    this.store.openReservation();
  }

  isInvalid(controlName: keyof typeof this.store.searchForm.controls): boolean {
    const control = this.store.searchForm.controls[controlName];
    return control.invalid && control.touched;
  }
}
