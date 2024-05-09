import { Routes } from '@angular/router';
import { CreateSchedulingComponent } from './components/create-scheduling/create-scheduling.component';
import { ListSchedulingsComponent } from './components/list-schedulings/list-schedulings.component';

export const SchedulingRoutes: Routes = [
  {
    path: 'create',
    component: CreateSchedulingComponent,
  },

  {
    path: 'list',
    component: ListSchedulingsComponent,
  },
];
