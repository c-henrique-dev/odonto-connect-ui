import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatusPipe',
  standalone: true
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'paid':
        return 'Pago';
      case 'waiting':
        return 'Aguardando';
      default:
        return value;
    }
  }

}
