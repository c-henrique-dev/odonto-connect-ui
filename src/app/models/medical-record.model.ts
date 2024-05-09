export interface MedicalRecord {
  id?: number;
  record_date: string;
  patient_id: string;
  description: string;
  attachment: File;
}
