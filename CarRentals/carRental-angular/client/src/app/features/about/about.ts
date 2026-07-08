import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly values = [
    {
      icon: 'assets/images/about/icon1.png',
      title: 'Trusted Since Day One',
      text: 'Founded on a simple promise: honest pricing and cars that show up clean, fuelled and ready.',
    },
    {
      icon: 'assets/images/about/icon2.png',
      title: 'Community Driven',
      text: 'We grew city by city, listening to renters and tuning our fleet and service around their trips.',
    },
    {
      icon: 'assets/images/about/icon3.png',
      title: 'Always Improving',
      text: 'From app bookings to roadside support, we keep raising the bar on what a rental should feel like.',
    },
  ];
}
