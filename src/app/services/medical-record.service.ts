import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { MedicalRecords } from '../models/medical-records.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService extends HttpBaseService {
  private readonly endpoint = 'api/medicalRecord';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createMedicalRecord(payload: FormData) {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  getMedicalRecords(name?: string): Observable<MedicalRecords> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }
    
    return this.httpGet(`${this.endpoint}/list`, params);
  }

  generateMedicalRecord(id: number) {
    return this.httpGetDownload(`${this.endpoint}/download/${id}`);
  }
}
