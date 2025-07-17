import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

type ProfileType = 'employer' | 'seeker';

@Component({
  selector: 'app-employer-profile',
  imports: [ProfileComponent],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss',
})
export class EmployerProfileComponent {
  router = inject(Router);
  type!: ProfileType;

  constructor(private route: ActivatedRoute) {
    this.type = this.route.snapshot.data['type'] as ProfileType;
  }

  onSkillsPage() {
    this.router.navigate(['/account-management']);
    console.log('Child component emitted the onProfile event');
  }
}
