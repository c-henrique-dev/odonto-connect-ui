import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Scheduling } from '../models/scheduling.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService extends HttpBaseService {
  private readonly endpoint = 'api/scheduling';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createScheduling(payload: Scheduling) {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  getSchedulings(name?: string) {
    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }

    return this.httpGet(`${this.endpoint}/list`, params);
  }
}
