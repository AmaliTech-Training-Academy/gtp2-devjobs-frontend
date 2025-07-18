import { Component, inject } from '@angular/core';
import { AccountManagementComponent } from '../../shared/account-management/account-management.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-account-management',
  imports: [AccountManagementComponent],
  templateUrl: './employer-account-management.component.html',
  styleUrl: './employer-account-management.component.scss',
})
export class EmployerAccountManagementComponent {
  router = inject(Router);

  onProfilePage() {
    this.router.navigate(['/employer/settings']);
  }
}
