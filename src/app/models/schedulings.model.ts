import { Dentist } from './dentist.model';
import { Patient } from './patient.model';

export interface Schedulings {
  data: [
    {
      treatment_type: string;
      comment: string;
      date_time: string;
      dentist: Dentist;
      patient: Patient;
    }
  ];
}
