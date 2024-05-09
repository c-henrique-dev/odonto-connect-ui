import { Routes } from '@angular/router';
import { CreateDentistComponent } from './components/create-dentist/create-dentist.component';
import { ListDentistsComponent } from './components/list-dentists/list-dentists.component';

export const DentistRoutes: Routes = [
  {
    path: 'create',
    component: CreateDentistComponent,
  },

  {
    path: 'list',
    component: ListDentistsComponent,
  },
];
