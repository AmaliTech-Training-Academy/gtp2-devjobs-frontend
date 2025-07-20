import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { JobService } from '../../core/services/job-service/job.service';
import { ProfileData } from '../../model/all.jobs';

@Component({
  selector: 'app-seeker-profile',
  imports: [ProfileComponent, BackButtonComponent],
  templateUrl: './seeker-profile.component.html',
  styleUrl: './seeker-profile.component.scss',
})
export class SeekerProfileComponent implements OnInit {
  router = inject(Router);
  jobService = inject(JobService);
  profileData!: ProfileData;

  ngOnInit(): void {
    this.jobService.getProfileDetails().subscribe({
      next: (data) => {
        this.profileData = data.data;
        console.log(this.profileData);
      },
    });
  }

  onSkillsPage() {
    this.router.navigate(['/seeker/dashboard/account-management']);
  }
}
