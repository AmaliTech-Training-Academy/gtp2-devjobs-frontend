import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { Router } from '@angular/router';
import { JobContentComponent } from '../../shared/job-content/job-content.component';

@Component({
  selector: 'app-job-details',
  imports: [BackButtonComponent, JobContentComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  private router = inject(Router);

  goToApplicationForm() {
    this.router.navigate(['seeker/dashboard/application-form']);
  }
}
