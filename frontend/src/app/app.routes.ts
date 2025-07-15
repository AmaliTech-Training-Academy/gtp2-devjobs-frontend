import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { JobDetailsComponent } from './features/job-details/job-details.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';
import { EmployerDashboardComponent } from './features/employer-dashboard/employer-dashboard.component';

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
    path: 'employer-dashboard',
    component: EmployerDashboardComponent,
    title: 'Employer dashboard'
  }

];
