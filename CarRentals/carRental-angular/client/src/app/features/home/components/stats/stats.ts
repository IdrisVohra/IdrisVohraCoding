import { Component } from '@angular/core';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

@Component({
  selector: 'app-stats',
  imports: [CountUpDirective],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly stats = [
    { icon: 'fa-solid fa-car', value: 120, suffix: '+', label: 'Cars in Fleet' },
    { icon: 'fa-solid fa-users', value: 8400, suffix: '+', label: 'Happy Customers' },
    { icon: 'fa-solid fa-city', value: 5, suffix: '', label: 'Cities Served' },
    { icon: 'fa-solid fa-star', value: 4, suffix: '.7★', label: 'Average Rating' },
  ];
}
