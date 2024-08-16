import { Dentist } from './dentist.model';
import { Patient } from './patient.model';

export interface Schedulings {
  data: [
    {
      id?: number;
      treatment_type: string;
      payment_status: string;
      comment: string;
      date_time: string;
      dentist: Dentist;
      patient: Patient;
    }
  ];
  total: number;
}
