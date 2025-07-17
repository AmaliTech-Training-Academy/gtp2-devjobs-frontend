import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../../../../shared/components/auth-form/auth-form.component';
import { AuthPublicNavbarComponent } from '../../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TooltipComponent } from '../../../../../shared/components/tooltip/tooltip/tooltip.component';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../../../../core/services/authservice/auth.service';
import { ToastService } from '../../../../../shared/utils/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    AuthFormComponent,
    AuthPublicNavbarComponent,
    MatIconModule,
    MatButtonModule,
    TooltipComponent,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  selectedRole: 'seeker' | 'employer' = 'seeker';
  isMobile = false;
  showTooltip = false;
  currentTipIndex = 0;

  constructor(
    private router: Router,
    private authService: Auth,
    private toast: ToastService
  ) {}
  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  switchRole(role: 'seeker' | 'employer') {
    this.selectedRole = role;
    this.currentTipIndex = 0;
  }

  onFormSubmit(formData: any): void {
    if (this.selectedRole === 'seeker') {
      this.authService.registerSeeker(formData).subscribe({
        next: (res) => {
          console.log('Seeker registered:', res);
          this.toast.success('Seeker registered successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toast.error('Seeker registration failed. Try again.');
          console.error('Seeker registration failed:', err);
        },
      });
    } else if (this.selectedRole === 'employer') {
      this.authService.registerEmployer(formData).subscribe({
        next: (res) => {
          console.log('Employer registered:', res);
          this.toast.success('Employer registered successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toast.error('Employer registration failed. Try again.');
          console.error('Employer registration failed:', err);
        },
      });
    }
  }
}
