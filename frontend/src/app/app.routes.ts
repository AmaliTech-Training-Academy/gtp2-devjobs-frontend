import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/pages/register/register/register.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password/forgot-password.component';
import { EmployerLayoutComponent } from './features/employer-layout/employer-layout.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { UnathorizedComponent } from './shared/components/unathorized/unathorized/unathorized.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found/page-not-found.component';
import { JobDetailsComponent } from './features/job-details/job-details.component';

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
    path: 'start-search',
    loadComponent: () =>
      import(
        './features/landing/pages/start-search/start-search.component'
      ).then((m) => m.StartSearchComponent),
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./features/landing/pages/jobs-list/jobs-list.component').then(
        (m) => m.JobsListComponent
      ),
  },
  {
    path: 'salary-estimate',
    loadComponent: () =>
      import(
        './features/landing/pages/salary-estimate/salary-estimate.component'
      ).then((m) => m.SalaryEstimateComponent),
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
            path: '',
            loadComponent: () =>
              import(
                './features/employer-profile/employer-profile.component'
              ).then((m) => m.EmployerProfileComponent),
            data: { type: 'employer' },
          },
          {
            path: 'account-management',
            loadComponent: () =>
              import(
                './features/employer-account-management/employer-account-management.component'
              ).then((m) => m.EmployerAccountManagementComponent),
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
        path: '',
        component: JobListComponent,
        pathMatch: 'full',
      },
      {
        path: 'job-details/:id',
        component: JobDetailsComponent,
      },
      {
        path: 'application-status',
        loadComponent: () =>
          import(
            './features/jobs/application-status/application-status.component'
          ).then((m) => m.ApplicationStatusComponent),
        canActivate: [authGuard, roleGuard],
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

        path: 'job-details/:id',
        loadComponent: () =>
          import('./features/job-details/job-details.component').then(
            (m) => m.JobDetailsComponent
          ),
      },
      {

        path: 'profile',
        loadComponent: () =>
          import('./features/seeker-profile/seeker-profile.component').then(
            (m) => m.SeekerProfileComponent
          ),
      },
      {
        path: 'account-management',
        loadComponent: () =>
          import(
            './features/seeker-account-management/seeker-account-management.component'
          ).then((m) => m.SeekerAccountManagementComponent),
      },
    ],
  },

  // Unauthorized Route
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
