import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.routes').then(
        (routes) => routes.AuthRoutes
      ),
  },

  {
    path: 'patient',
    loadChildren: () =>
      import('./pages/patient/patient.routes').then(
        (routes) => routes.PatientRoutes
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'dentist',
    loadChildren: () =>
      import('./pages/dentist/dentist.routes').then(
        (routes) => routes.DentistRoutes
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'scheduling',
    loadChildren: () =>
      import('./pages/scheduling/scheduling.routes').then(
        (routes) => routes.SchedulingRoutes
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'medicalRecord',
    loadChildren: () =>
      import('./pages/medical-record/medical-record.routes').then(
        (routes) => routes.MedicalRecordtRoutes
      ),
    canActivate: [AuthGuard],
  },
];
