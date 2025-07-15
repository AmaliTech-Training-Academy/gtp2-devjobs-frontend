import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { JobDetailsComponent } from './features/job-details/job-details.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password/forgot-password.component';

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
];
