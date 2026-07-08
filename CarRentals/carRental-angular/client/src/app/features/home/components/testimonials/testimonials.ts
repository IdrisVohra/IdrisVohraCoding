import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-testimonials',
  imports: [ScrollRevealDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  protected readonly reviews = [
    {
      name: 'Aisha Khan',
      role: 'Frequent Traveller',
      photo: 'assets/images/testimonials/pfp1.jpg',
      rating: 5,
      quote:
        'Booking was effortless and the Hyundai i20 was spotless. The team even helped me extend my trip by a day without any hassle.',
    },
    {
      name: 'Rohan Mehta',
      role: 'Business Commuter',
      photo: 'assets/images/testimonials/pfp2.jpg',
      rating: 5,
      quote:
        'I rent a car every month for client visits — Hamdan Rentals is consistently the most reliable and affordable option around.',
    },
    {
      name: 'Sara Ali',
      role: 'Weekend Explorer',
      photo: 'assets/images/testimonials/user.png',
      rating: 4,
      quote:
        'Great fleet variety and the pick-up/drop-off across cities made our road trip planning so much easier.',
    },
  ];
}
