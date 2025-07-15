import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { JobDetailsComponent } from './features/job-details/job-details.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';
import { EmployerDashboardComponent } from './features/employer-dashboard/employer-dashboard.component';
import { EmployerLayoutComponent } from './features/employer-layout/employer-layout.component';
import { EmployerJobsComponent } from './features/employer-jobs/employer-jobs.component';
import { EmployerApplicationsComponent } from './features/employer-applications/employer-applications.component';
import { EmployerSettingsComponent } from './features/employer-settings/employer-settings.component';



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
    path: 'employer',
    component: EmployerLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/employer-dashboard/employer-dashboard.component').then( m => m.EmployerDashboardComponent ),
        title: 'Employer dashboard'
      },
      {
        path: 'jobs',
        loadComponent: () => import('./features/employer-jobs/employer-jobs.component').then( m => m.EmployerJobsComponent ),
        title: 'Employer Jobs'
      },
      {
        path: 'applications',
        loadComponent: () => import('./features/employer-applications/employer-applications.component').then( m => m.EmployerApplicationsComponent ),
        title: 'Employer Applications'
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/employer-settings/employer-settings.component').then( m => m.EmployerSettingsComponent),
        title: 'Employer Settings'
      }
    ]

  }
];
