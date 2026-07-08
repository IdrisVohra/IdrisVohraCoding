import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneFormat' })
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | number | null | undefined): string {
    const digits = String(value ?? '').replace(/\D/g, '');
    if (digits.length !== 10) {
      return String(value ?? '');
    }
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
}
