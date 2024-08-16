import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Dentist } from '../models/dentist.model';
import { Observable, Subject } from 'rxjs';
import { Dentists } from '../models/dentists.model';

@Injectable({
  providedIn: 'root',
})
export class DentistService extends HttpBaseService {
  private readonly endpoint = 'api/dentist';
  private dentists$ = new Subject<Dentist[]>();

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createDentist(payload: Dentist): Observable<Dentist> {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  editDentist(payload: Dentist, id: number): Observable<Dentist> {
    return this.httpPatch(`${this.endpoint}/update/${id}`, payload);
  }

  getDentists(): Observable<Dentists> {
    return this.httpGet(`${this.endpoint}/list`);
  }

  updateSubjectDentist(): void {
    this.getDentists().subscribe((result) => {
      this.dentists$.next(result.data);
    });
  }

  getSubjectDentist(): Observable<Dentist[]> {
    return this.dentists$.asObservable();
  }

  deleteDentist(id: number): Observable<string> {
    return this.httpDelete(`${this.endpoint}/delete/${id}`);
  }
}
