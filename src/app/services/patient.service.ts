import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Patient } from '../models/patient.model';
import { Observable, Subject } from 'rxjs';
import { Patients } from '../models/patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends HttpBaseService {
  private readonly endpoint = 'api/patient';
  private patients$ = new Subject<Patient[]>();

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createPatient(payload: Patient): Observable<Patient> {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  editPatient(payload: Patient, id: number): Observable<Patient> {
    return this.httpPatch(`${this.endpoint}/update/${id}`, payload);
  }

  getPatients(): Observable<Patients> {
    return this.httpGet(`${this.endpoint}/list`);
  }

  updateSubjectPatient(): void {
    this.getPatients().subscribe((result) => {
      this.patients$.next(result.data);
    });
  }

  getSubjectPatient(): Observable<Patient[]> {
    return this.patients$.asObservable();
  }

  deletePatient(id: number): Observable<string> {
    return this.httpDelete(`${this.endpoint}/delete/${id}`);
  }
}
