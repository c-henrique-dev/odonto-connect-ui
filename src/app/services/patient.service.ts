import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Patients } from '../models/patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends HttpBaseService {
  private readonly endpoint = 'api/patient';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createPatient(payload: Patient) {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  editPatient(payload: Patient, id: number) {
    return this.httpPatch(`${this.endpoint}/update/${id}`, payload);
  }

  getPatients(name?: string): Observable<Patients> {
    let params = new HttpParams();
    return this.httpGet(`${this.endpoint}/list`);
  }

  deletePatient(id: number): Observable<void> {
    return this.httpDelete(`${this.endpoint}/delete/${id}`);
  }
}
