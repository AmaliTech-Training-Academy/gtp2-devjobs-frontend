import { Routes } from '@angular/router';
import { JobDetailsComponent } from './features/job-details/job-details.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent
      ),
  },
];
