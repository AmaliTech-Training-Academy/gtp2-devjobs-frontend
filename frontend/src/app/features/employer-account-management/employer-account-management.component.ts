import { Component, inject } from '@angular/core';
import { AccountManagementComponent } from '../../shared/account-management/account-management.component';
import { Router } from '@angular/router';
import { Skill } from '../../model/all.jobs';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';

@Component({
  selector: 'app-employer-account-management',
  imports: [AccountManagementComponent],
  templateUrl: './employer-account-management.component.html',
  styleUrl: './employer-account-management.component.scss',
})
export class EmployerAccountManagementComponent {
  router = inject(Router);
  employerService = inject(EmployerHttpRequestsService);
  skills!: Skill[];

  onProfilePage() {
    this.router.navigate(['/employer/settings']);
  }

  constructor() {
    this.employerService.getSkills().subscribe({
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
