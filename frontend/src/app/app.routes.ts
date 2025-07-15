import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';

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
 
];
