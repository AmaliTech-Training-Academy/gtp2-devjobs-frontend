import { Routes } from '@angular/router';
import { SeekerDashboardComponent } from './layouts/seeker/seeker-dashboard/seeker-dashboard.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';

export const routes: Routes = [
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
