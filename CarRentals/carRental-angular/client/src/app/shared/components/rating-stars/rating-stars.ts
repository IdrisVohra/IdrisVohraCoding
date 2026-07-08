import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  template: `
    <span class="rating" [attr.aria-label]="'Rated ' + rating() + ' out of 5'">
      @for (i of stars(); track i) {
        <i class="fa-solid fa-star" [class.rating--empty]="i > rating()"></i>
      }
      <span class="rating__value">{{ rating().toFixed(1) }}</span>
    </span>
  `,
  styleUrl: './rating-stars.scss',
})
export class RatingStars {
  readonly rating = input.required<number>();
  protected readonly stars = computed(() => [1, 2, 3, 4, 5]);
}
