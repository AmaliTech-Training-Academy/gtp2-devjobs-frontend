import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPublicNavbarComponent } from '../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { JobListComponent } from '../../../jobs/job-list/job-list.component';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AuthPublicNavbarComponent,
    FooterComponent,
    JobListComponent,
  ],
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent {}
