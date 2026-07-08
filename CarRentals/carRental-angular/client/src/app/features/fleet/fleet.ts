import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../core/services/car.service';
import { Car, CarCategory } from '../../core/models/car.model';
import { CarCard } from '../../shared/components/car-card/car-card';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

type SortOption = 'price-asc' | 'price-desc' | 'rating';

@Component({
  selector: 'app-fleet',
  imports: [FormsModule, CarCard, ScrollRevealDirective],
  templateUrl: './fleet.html',
  styleUrl: './fleet.scss',
})
export class Fleet {
  private readonly carService = inject(CarService);
  private readonly router = inject(Router);

  protected readonly search = signal('');
  protected readonly category = signal<CarCategory | 'All'>('All');
  protected readonly sortBy = signal<SortOption>('rating');

  protected readonly categories: (CarCategory | 'All')[] = ['All', 'Hatchback', 'Compact', 'Sedan', 'SUV'];

  protected readonly filteredCars = computed(() => {
    const term = this.search().trim().toLowerCase();
    const category = this.category();

    let result = this.carService.all().filter((car) => {
      const matchesSearch = !term || car.name.toLowerCase().includes(term) || car.brand.toLowerCase().includes(term);
      const matchesCategory = category === 'All' || car.category === category;
      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      switch (this.sortBy()) {
        case 'price-asc':
          return a.pricePerDay - b.pricePerDay;
        case 'price-desc':
          return b.pricePerDay - a.pricePerDay;
        default:
          return b.rating - a.rating;
      }
    });

    return result;
  });

  reserve(car: Car): void {
    this.router.navigate(['/'], { queryParams: { car: car.model }, fragment: 'booking-section' });
  }
}
