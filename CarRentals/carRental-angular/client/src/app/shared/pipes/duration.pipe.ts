import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(totalHours: number | null | undefined): string {
    if (!totalHours || totalHours <= 0) {
      return '—';
    }
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    if (days === 0) {
      return `${hours} hr${hours === 1 ? '' : 's'}`;
    }
    if (hours === 0) {
      return `${days} day${days === 1 ? '' : 's'}`;
    }
    return `${days} day${days === 1 ? '' : 's'} ${hours} hr${hours === 1 ? '' : 's'}`;
  }
}
