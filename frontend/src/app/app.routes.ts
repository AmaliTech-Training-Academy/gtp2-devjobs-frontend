import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password/forgot-password.component';
import { EmployerLayoutComponent } from './features/employer-layout/employer-layout.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { UnathorizedComponent } from './shared/components/unathorized/unathorized/unathorized.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
<<<<<<< HEAD
import { DataTableComponent } from './shared/data-table/data-table.component';
=======
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found/page-not-found.component';
>>>>>>> 79c735c5f1bd82695bbb35d1dcf910962ca80e14

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
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

  // Employer Routes
  {
    path: 'employer',
    component: EmployerLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_EMPLOYER' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/employer-dashboard/employer-dashboard.component'
          ).then((m) => m.EmployerDashboardComponent),
        title: 'Employer Dashboard',
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
        children: [
          {
            path: 'profile',
            loadComponent: () =>
              import('./shared/profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
            data: { type: 'employer' },
          },
          {
            path: 'account-management',
            loadComponent: () =>
              import(
                './shared/account-management/account-management.component'
              ).then((m) => m.AccountManagementComponent),
          },
        ],
      },
    ],
  },

  // Seeker Routes
  {
    path: 'seeker/dashboard',
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ROLE_JOB_SEEKER' },
    loadComponent: () =>
      import(
        './layouts/seeker/seeker-dashboard/seeker-dashboard.component'
      ).then((m) => m.SeekerDashboardComponent),
    children: [
      {
        path: 'jobs-list',
        component: JobListComponent,
        // canActivate: [authGuard, roleGuard],
        data: { expectedRole: 'ROLE_JOB_SEEKER' },
        pathMatch: 'full',
      },
      {
        path: 'application-status',
        loadComponent: () =>
          import(
            './features/jobs/application-status/application-status.component'
          ).then((m) => m.ApplicationStatusComponent),
        // canActivate: [authGuard, roleGuard],
        data: { expectedRole: 'ROLE_JOB_SEEKER' },
      },
      {
        path: 'application-form',
        loadComponent: () =>
          import('./features/application-form/application-form.component').then(
            (m) => m.ApplicationFormComponent
          ),
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: 'ROLE_JOB_SEEKER' },
      },
      {
        path: 'job-details',
        loadComponent: () =>
          import('./features/job-details/job-details.component').then(
            (m) => m.JobDetailsComponent
          ),
      },
    ],
  },
  {
    path: 'tables',
    component: DataTableComponent,
    title: 'data-table'

<<<<<<< HEAD
  },
  //Redirects and wildcards
=======
  // Unauthorized Route
>>>>>>> 79c735c5f1bd82695bbb35d1dcf910962ca80e14
  {
    path: 'unauthorized',
    component: UnathorizedComponent,
  },
  // Catch-all Wildcard
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
