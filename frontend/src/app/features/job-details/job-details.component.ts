import { Component, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { Router, ActivatedRoute } from '@angular/router';
import { JobContentComponent } from '../../shared/job-content/job-content.component';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';
import { Auth } from '../../core/services/authservice/auth.service';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job-service/job.service';
import { Job } from '../../model/all.jobs';

@Component({
  selector: 'app-job-details',
  imports: [
    CommonModule,
    BackButtonComponent,
    JobContentComponent,
    ActionModalComponent,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  private router = inject(Router);
  private auth = inject(Auth);
  jobService = inject(JobService);
  route = inject(ActivatedRoute);
  showAuthModal = false;
  job!: Job | null;

  ngOnInit(): void {
    this.job = this.jobService.getSelectedJob();

    if (!this.job) {
      const jobId = this.route.snapshot.paramMap.get('id');
      if (jobId) {
        this.jobService.getJobById(jobId).subscribe((response) => {
          this.job = response.data ? response.data : null;
        });
      }
    }
  }

  onApply() {
    if (!this.auth.isLoggedIn()) {
      this.showAuthModal = true;
    } else {
      this.router.navigate(['seeker/dashboard/application-form']);
    }
  }

  handleAuthModalConfirm(action: 'login' | 'signup') {
    this.showAuthModal = false;
    if (action === 'login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
