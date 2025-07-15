import { Routes } from '@angular/router';

import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { JobDetailsComponent } from './features/job-details/job-details.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';
import { SeekerDashboardComponent } from './layouts/seeker/seeker-dashboard/seeker-dashboard.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';

export const routes: Routes = [
   {
    path: '',
    loadComponent: () =>
      import('./features/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent
      ),
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
   {
    path: 'application-form',
    loadComponent: () =>
      import('./features/application-form/application-form.component').then(
        (m) => m.ApplicationFormComponent
      ),
  },
     {
        path: 'seeker/dashboard', 
        loadComponent: () => import('./layouts/seeker/seeker-dashboard/seeker-dashboard.component').then(m => m.SeekerDashboardComponent),
        canActivate: [],
        children: [
            { path: '', component: JobListComponent,
                canActivate: []
             },
        ],
    },
];
