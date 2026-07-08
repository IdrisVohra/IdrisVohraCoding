import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  scrollToBooking(event: Event): void {
    event.preventDefault();
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToFleet(event: Event): void {
    event.preventDefault();
    document.getElementById('pick-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
