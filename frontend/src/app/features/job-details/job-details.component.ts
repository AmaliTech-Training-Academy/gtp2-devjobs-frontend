import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { Router } from '@angular/router';
import { JobContentComponent } from '../../shared/job-content/job-content.component';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';
import { Auth } from '../../core/services/authservice/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule,BackButtonComponent, JobContentComponent, ActionModalComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  private router = inject(Router);
  private auth = inject(Auth);
  showAuthModal = false;

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
