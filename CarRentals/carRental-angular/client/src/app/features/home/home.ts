import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../core/models/car.model';
import { CarCard } from '../../shared/components/car-card/car-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { BookingStore } from '../booking/booking-store';
import { BookingWidget } from '../booking/booking-widget/booking-widget';
import { BookingModal } from '../booking/booking-modal/booking-modal';
import { Hero } from './components/hero/hero';
import { WhyChooseUs } from './components/why-choose-us/why-choose-us';
import { Stats } from './components/stats/stats';
import { Testimonials } from './components/testimonials/testimonials';
import { CtaBanner } from './components/cta-banner/cta-banner';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    BookingWidget,
    BookingModal,
    CarCard,
    ScrollRevealDirective,
    WhyChooseUs,
    Stats,
    Testimonials,
    CtaBanner,
  ],
  providers: [BookingStore],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  protected readonly carService = inject(CarService);
  protected readonly bookingStore = inject(BookingStore);
  private readonly route = inject(ActivatedRoute);

  protected readonly cars = this.carService.all;
  protected readonly activeCarId = signal(this.carService.all()[0]?.id ?? '');

  protected readonly activeCar = () => this.cars().find((car) => car.id === this.activeCarId());

  ngOnInit(): void {
    const model = this.route.snapshot.queryParamMap.get('car');
    if (model) {
      this.bookingStore.searchForm.controls.carType.setValue(model);
    }
  }

  selectCar(id: string): void {
    this.activeCarId.set(id);
  }

  reserve(car: Car): void {
    this.bookingStore.prefillCar(car.model);
  }
}
