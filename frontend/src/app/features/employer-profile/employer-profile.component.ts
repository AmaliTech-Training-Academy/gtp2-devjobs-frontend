import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyProfile } from '../../model/all.jobs';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';

type ProfileType = 'employer' | 'seeker';

@Component({
  selector: 'app-employer-profile',
  imports: [ProfileComponent],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss',
})
export class EmployerProfileComponent {
  router = inject(Router);
  employerService = inject(EmployerHttpRequestsService);
  type!: ProfileType;
  employerProfile!: CompanyProfile;

  constructor(private route: ActivatedRoute) {
    this.type = this.route.snapshot.data['type'] as ProfileType;

    this.employerService.getProfileDetails().subscribe({
      next: (data) => {
        this.employerProfile = data.data;
      },
    });
  }

  onSkillsPage() {
    this.router.navigate(['/employer/settings/account-management']);
  }

  onSubmit(formData: FormData) {
    console.log('employer details', formData);

    this.employerService
      .updateProfileDetails(formData, this.employerProfile.id)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
