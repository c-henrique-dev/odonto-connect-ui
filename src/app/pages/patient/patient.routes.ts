import { Routes } from '@angular/router';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';

export const PatientRoutes: Routes = [
  {
    path: 'create',
    component: CreatePatientComponent,
  },

  {
    path: 'list',
    component: ListPatientComponent,
  },
];
