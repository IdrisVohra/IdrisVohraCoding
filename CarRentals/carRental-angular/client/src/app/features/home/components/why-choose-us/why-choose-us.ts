import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-why-choose-us',
  imports: [ScrollRevealDirective],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
})
export class WhyChooseUs {
  protected readonly reasons = [
    {
      icon: 'fa-solid fa-tags',
      title: 'Best Price Guarantee',
      text: 'Transparent pricing with no hidden fees — we match any lower price you find.',
    },
    {
      icon: 'fa-solid fa-road',
      title: 'Unlimited Mileage',
      text: 'Drive as far as your adventure takes you without worrying about extra charges.',
    },
    {
      icon: 'fa-solid fa-headset',
      title: '24/7 Roadside Support',
      text: 'Our support team and roadside assistance are available around the clock.',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Fully Insured Fleet',
      text: 'Every vehicle is regularly serviced and comes with comprehensive insurance.',
    },
  ];
}
