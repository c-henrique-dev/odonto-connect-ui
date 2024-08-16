import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { MedicalRecords } from '../models/medical-records.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MedicalRecord } from '../models/medical-record.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService extends HttpBaseService {
  private readonly endpoint = 'api/medicalRecord';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  createMedicalRecord(payload: FormData): Observable<MedicalRecord> {
    return this.httpPost(`${this.endpoint}/create`, payload);
  }

  getMedicalRecords(
    name?: string,
    startDate?: string,
    endDate?: string,
    size?: number,
    page?: number
  ): Observable<MedicalRecords> {
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

    if (startDate) {
      params = params.set('start_date', startDate);
    }

    if (endDate) {
      params = params.set('end_date', endDate);
    }

    return this.httpGet(`${this.endpoint}/list`, params);
  }

  generateMedicalRecord(id: number) {
    return this.httpGetDownload(`${this.endpoint}/download/${id}`);
  }
}
