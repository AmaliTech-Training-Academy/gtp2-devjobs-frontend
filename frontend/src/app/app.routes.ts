import { Routes } from '@angular/router';
import { JobDetailsComponent } from './features/job-details/job-details.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent
      ),
  },
  {
    path: 'application-form',
    loadComponent: () =>
      import('./features/application-form/application-form.component').then(
        (m) => m.ApplicationFormComponent
      ),
  },
];
