import { Component, inject } from '@angular/core';
import { AccountManagementComponent } from '../../shared/account-management/account-management.component';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { JobService } from '../../core/services/job-service/job.service';
import { Skill } from '../../model/all.jobs';

@Component({
  selector: 'app-seeker-account-management',
  imports: [AccountManagementComponent, BackButtonComponent],
  templateUrl: './seeker-account-management.component.html',
  styleUrl: './seeker-account-management.component.scss',
})
export class SeekerAccountManagementComponent {
  router = inject(Router);
  jobService = inject(JobService);
  skills!: Skill[];

  onProfilePage() {
    this.router.navigate(['/seeker/dashboard/profile']);
  }

  constructor() {
    this.jobService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
      },
      error: (err) => {
        this.skills = [
          {
            id: 'c1234567-abcd-1234-ef00-1234567890ab',
            createdAt: '2025-07-20T15:30:00.000Z',
            updatedAt: '2025-07-20T16:00:00.000Z',
            name: 'Java Programming',
            category: 'Software',
            usageCount: 42,
            createdByUserId: 'b9876543-cdef-4567-abcd-0987654321fe',
          },
        ];
      },
    });
  }
}
