import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends HttpBaseService {
  private readonly endpoint = 'api/payment';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createPayment(payload: Payment) {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }
}
