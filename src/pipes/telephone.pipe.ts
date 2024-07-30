import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone',
  standalone: true
})
export class TelephonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
  }
}
