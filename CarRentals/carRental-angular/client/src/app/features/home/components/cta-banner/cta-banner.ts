import { Component } from '@angular/core';

@Component({
  selector: 'app-cta-banner',
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
})
export class CtaBanner {
  scrollToBooking(event: Event): void {
    event.preventDefault();
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
