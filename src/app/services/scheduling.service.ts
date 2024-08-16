import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Scheduling } from '../models/scheduling.model';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedulings } from '../models/schedulings.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService extends HttpBaseService {
  private readonly endpoint = 'api/scheduling';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createScheduling(payload: Scheduling): Observable<Scheduling> {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  cancelScheduling(id: number): Observable<string> {
    return this.httpPost(`${this.endpoint}/cancel/${id}`);
  }

  getSchedulings(
    name?: string,
    status?: string,
    paymentStatus?: string,
    startDate?: string,
    endDate?: string,
    size?: number,
    page?: number
  ): Observable<Schedulings> {
    let params = new HttpParams();

    if (size) {
      params = params.set('size', size);
    }

    if (page) {
      params = params.set('page', page);
    }

    if (name) {
      params = params.set('name', name);
    }

    if (status) {
      params = params.set('status', status);
    }

    if (paymentStatus) {
      params = params.set('payment_status', paymentStatus);
    }

    if (startDate) {
      params = params.set('start_date', startDate);
    }

    if (endDate) {
      params = params.set('end_date', endDate);
    }

    return this.httpGet(`${this.endpoint}/list`, params);
  }
}
