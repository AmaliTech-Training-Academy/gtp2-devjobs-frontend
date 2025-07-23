import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { JobService } from '../../core/services/job-service/job.service';
import { ProfileData } from '../../model/all.jobs';
import { ToastService } from '../../shared/utils/toast/toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seeker-profile',
  imports: [ProfileComponent, BackButtonComponent],
  templateUrl: './seeker-profile.component.html',
  styleUrl: './seeker-profile.component.scss',
})
export class SeekerProfileComponent implements OnInit {
  router = inject(Router);
  jobService = inject(JobService);
  toast = inject(ToastService);
  profileData!: ProfileData;
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.jobService.getProfileDetails().subscribe({
      next: (data) => {
        this.profileData = data.data;
      },
    });
  }

  onSkillsPage() {
    this.router.navigate(['/seeker/dashboard/account-management']);
  }

  onSubmit(formData: FormData) {
    this.jobService
      .updateProfileDetails(formData, this.profileData.profileId)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Profile has been updated!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        },
        error: (err) => {
          this.toast.error('Failed to update profile. Please try again.');
        },
      });
  }
}
