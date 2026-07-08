import { Component, input, output } from '@angular/core';
import { Car } from '../../../core/models/car.model';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-car-card',
  imports: [RatingStars],
  templateUrl: './car-card.html',
  styleUrl: './car-card.scss',
})
export class CarCard {
  readonly car = input.required<Car>();
  readonly compact = input(false);
  readonly reserve = output<Car>();
}
