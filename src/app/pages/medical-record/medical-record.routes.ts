import { Routes } from '@angular/router';
import { CreateMedicalRecordComponent } from './components/create-medical-record/create-medical-record.component';
import { ListMedicalRecordsComponent } from './components/list-medical-records/list-medical-records.component';

export const MedicalRecordtRoutes: Routes = [
  {
    path: 'create',
    component: CreateMedicalRecordComponent,
  },

  {
    path: 'list',
    component: ListMedicalRecordsComponent,
  },
];
