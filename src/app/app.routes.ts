import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MenubarComponent } from './components/menubar/menubar.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    component: AuthComponent,
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.routes').then(
        (routes) => routes.LoginRoutes
      ),
  },

  {
    path: '',
    component: MenubarComponent,
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./pages/patient/patient.routes').then(
            (routes) => routes.PatientRoutes
          ),
      },

      {
        path: 'dentist',
        loadChildren: () =>
          import('./pages/dentist/dentist.routes').then(
            (routes) => routes.DentistRoutes
          ),
      },

      {
        path: 'scheduling',
        loadChildren: () =>
          import('./pages/scheduling/scheduling.routes').then(
            (routes) => routes.SchedulingRoutes
          ),
      },

      {
        path: 'medicalRecord',
        loadChildren: () =>
          import('./pages/medical-record/medical-record.routes').then(
            (routes) => routes.MedicalRecordtRoutes
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
];
