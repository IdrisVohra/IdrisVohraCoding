import { Injectable, signal } from '@angular/core';
import { Car } from '../models/car.model';
import { CARS } from '../data/car-data';

@Injectable({ providedIn: 'root' })
export class CarService {
  private readonly cars = signal<Car[]>(CARS);

  readonly all = this.cars.asReadonly();

  getById(id: string): Car | undefined {
    return this.cars().find((car) => car.id === id);
  }

  getByModel(model: string): Car | undefined {
    return this.cars().find((car) => car.model === model);
  }
}
