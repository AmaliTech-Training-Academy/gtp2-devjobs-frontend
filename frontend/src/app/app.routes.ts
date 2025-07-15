import { Routes } from '@angular/router';
import { SeekerDashboardComponent } from './layouts/seeker/seeker-dashboard/seeker-dashboard.component';

export const routes: Routes = [
    {
        path: 'seeker/dashboard', 
        component: SeekerDashboardComponent,
        canActivate: [],
        children: [
            { path: 'job-search', 
                loadComponent: () => import('./layouts/seeker/seeker-dashboard/seeker-dashboard.component').then(m => m.SeekerDashboardComponent),
                canActivate: []
             },
        ],
    },
];
