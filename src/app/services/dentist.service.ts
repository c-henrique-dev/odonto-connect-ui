import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Dentist } from '../models/dentist.model';
import { Observable } from 'rxjs';
import { Dentists } from '../models/dentists.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DentistService extends HttpBaseService {
  private readonly endpoint = 'api/dentist';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createDentist(payload: Dentist) {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  getDentists(name?: string): Observable<Dentists> {
    let params = new HttpParams();
    return this.httpGet(`${this.endpoint}/list`);
  }
}
