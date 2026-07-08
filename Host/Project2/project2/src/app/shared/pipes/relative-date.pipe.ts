import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'relativeDate' })
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

    if (diffDays === 0) return `Today, ${time}`;
    if (diffDays === -1) return `Yesterday, ${time}`;
    if (diffDays < -1 && diffDays >= -6) return `${Math.abs(diffDays)} days ago`;

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + `, ${time}`;
  }
}
