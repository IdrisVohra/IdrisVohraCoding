import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CarService } from '../../core/services/car.service';
import { RentalService } from '../../core/services/rental.service';
import { ToastService } from '../../core/services/toast.service';
import { LOCATIONS } from '../../core/data/locations';
import {
  dropAfterPickValidator,
  futureOrTodayDateValidator,
  minAgeValidator,
  positiveNumberValidator,
} from '../../shared/validators/booking-validators';

@Injectable()
export class BookingStore {
  private readonly fb = inject(FormBuilder);
  private readonly carService = inject(CarService);
  private readonly rentalService = inject(RentalService);
  private readonly toast = inject(ToastService);

  readonly locations = LOCATIONS;
  readonly cars = this.carService.all;

  readonly isModalOpen = signal(false);
  readonly isSubmitting = signal(false);

  readonly searchForm = this.fb.nonNullable.group(
    {
      carType: ['', Validators.required],
      pickUp: ['', Validators.required],
      dropOff: ['', Validators.required],
      pickDate: ['', [Validators.required, futureOrTodayDateValidator]],
      dropDate: ['', Validators.required],
      pickTime: ['10:00', Validators.required],
      dropTime: ['10:00', Validators.required],
    },
    { validators: dropAfterPickValidator('pickDate', 'dropDate') },
  );

  readonly reservationForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    age: ['', [Validators.required, minAgeValidator(18)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
    totalHours: [0, [Validators.required, positiveNumberValidator]],
    pricePerHour: [0, [Validators.required, positiveNumberValidator]],
    advancePaid: [0, [Validators.required, Validators.min(0)]],
    documentsSubmitted: [false],
  });

  readonly selectedCar = computed(() =>
    this.carService.all().find((car) => car.model === this.searchForm.controls.carType.value),
  );

  readonly totalTripCharge = computed(() => {
    const hours = this.reservationForm.controls.totalHours.value || 0;
    const rate = this.reservationForm.controls.pricePerHour.value || 0;
    return Math.round(hours * rate * 100) / 100;
  });

  constructor() {
    this.searchForm.controls.carType.valueChanges.subscribe((model) => {
      const car = this.carService.getByModel(model);
      if (car) {
        this.reservationForm.controls.pricePerHour.setValue(car.pricePerHour, { emitEvent: false });
      }
    });
  }

  prefillCar(model: string): void {
    this.searchForm.controls.carType.setValue(model);
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  openReservation(): boolean {
    this.searchForm.markAllAsTouched();
    if (this.searchForm.invalid) {
      return false;
    }

    const { pickDate, dropDate } = this.searchForm.getRawValue();
    const hours = this.computeHours(pickDate, dropDate);
    const car = this.selectedCar();

    this.reservationForm.patchValue({
      totalHours: hours,
      pricePerHour: car?.pricePerHour ?? 0,
    });

    this.isModalOpen.set(true);
    return true;
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  confirmBooking(): void {
    this.reservationForm.markAllAsTouched();
    if (this.reservationForm.invalid || this.searchForm.invalid) {
      this.toast.error('Please fill in every required field correctly.');
      return;
    }

    const car = this.selectedCar();
    if (!car) {
      this.toast.error('Please select a car type.');
      return;
    }

    const search = this.searchForm.getRawValue();
    const reservation = this.reservationForm.getRawValue();

    const payload = {
      vehicleId: car.regNumber,
      customerName: `${reservation.firstName} ${reservation.lastName}`.trim(),
      customerAge: Number(reservation.age),
      customerEmail: reservation.email,
      customerPhone: reservation.phone,
      givenPlace: search.pickUp,
      returnPlace: search.dropOff,
      givenTime: `${search.pickDate}T${search.pickTime}`,
      returnTime: `${search.dropDate}T${search.dropTime}`,
      address: `${reservation.address}, ${reservation.city} ${reservation.zipCode}`,
      carModel: car.model,
      totalHours: Number(reservation.totalHours),
      pricePerHour: Number(reservation.pricePerHour),
      advancePaid: Number(reservation.advancePaid),
      totalTripCharges: this.totalTripCharge(),
      documentsSubmitted: reservation.documentsSubmitted,
    };

    this.isSubmitting.set(true);
    this.rentalService
      .create(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Reservation confirmed! Check your email for details.');
          this.isModalOpen.set(false);
          this.reservationForm.reset({
            firstName: '',
            lastName: '',
            phone: '',
            age: '',
            email: '',
            address: '',
            city: '',
            zipCode: '',
            totalHours: 0,
            pricePerHour: 0,
            advancePaid: 0,
            documentsSubmitted: false,
          });
          this.searchForm.reset({
            carType: '',
            pickUp: '',
            dropOff: '',
            pickDate: '',
            dropDate: '',
            pickTime: '10:00',
            dropTime: '10:00',
          });
        },
      });
  }

  private computeHours(pickDate: string, dropDate: string): number {
    if (!pickDate || !dropDate) {
      return 24;
    }
    const diffMs = new Date(dropDate).getTime() - new Date(pickDate).getTime();
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(days, 1) * 24;
  }
}
