import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-seeker-profile',
  imports: [ProfileComponent, BackButtonComponent],
  templateUrl: './seeker-profile.component.html',
  styleUrl: './seeker-profile.component.scss',
})
export class SeekerProfileComponent {
  router = inject(Router);

  onSkillsPage() {
    this.router.navigate(['/seeker/dashboard/account-management']);
  }
}
