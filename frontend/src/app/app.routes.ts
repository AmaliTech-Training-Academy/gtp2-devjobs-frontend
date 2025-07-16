import { Routes } from '@angular/router';

import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { EmployerLayoutComponent } from './features/employer-layout/employer-layout.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/seeker/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'seeker/dashboard',
    loadComponent: () =>
      import(
        './layouts/seeker/seeker-dashboard/seeker-dashboard.component'
      ).then((m) => m.SeekerDashboardComponent),
    canActivate: [],
    children: [
      {
        path: '',
        component: JobListComponent,
        canActivate: [],
        pathMatch: 'full',
      },
      { path: 'application-status', 
              loadComponent: () => import('./features/jobs/application-status/application-status.component').then(m => m.ApplicationStatusComponent),
                canActivate: []
             },
      {
        path: 'job-details',
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
    ],
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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'application-form',
    loadComponent: () =>
      import('./features/application-form/application-form.component').then(
        (m) => m.ApplicationFormComponent
      ),
  },

  {
    path: 'employer',
    component: EmployerLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/employer-dashboard/employer-dashboard.component'
          ).then((m) => m.EmployerDashboardComponent),
        title: 'Employer dashboard',
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/employer-jobs/employer-jobs.component').then(
            (m) => m.EmployerJobsComponent
          ),
        title: 'Employer Jobs',
      },
      {
        path: 'applications',
        loadComponent: () =>
          import(
            './features/employer-applications/employer-applications.component'
          ).then((m) => m.EmployerApplicationsComponent),
        title: 'Employer Applications',
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './features/employer-settings/employer-settings.component'
          ).then((m) => m.EmployerSettingsComponent),
        title: 'Employer Settings',
      },
    ],
  },


];
