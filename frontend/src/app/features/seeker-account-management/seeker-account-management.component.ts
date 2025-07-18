import { Component, inject } from '@angular/core';
import { AccountManagementComponent } from '../../shared/account-management/account-management.component';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-seeker-account-management',
  imports: [AccountManagementComponent, BackButtonComponent],
  templateUrl: './seeker-account-management.component.html',
  styleUrl: './seeker-account-management.component.scss',
})
export class SeekerAccountManagementComponent {
  router = inject(Router);

  onProfilePage() {
    this.router.navigate(['/seeker/dashboard/profile']);
  }
}
