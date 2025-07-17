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
import { LoadingService } from '../../../../../shared/utils/loading/loading.service';

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
  backendErrors: { [key: string]: string } | null = null;

  constructor(
    private router: Router,
    private authService: Auth,
    private toast: ToastService,
    private loadingService: LoadingService
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
    // Clear backend errors when switching roles
    this.backendErrors = null;
  }

  private parseBackendErrors(error: any): { [key: string]: string } | null {
    const errors: { [key: string]: string } = {};

    // Check if error response contains validation errors
    if (error?.error?.errors) {
      // Handle different error formats
      if (Array.isArray(error.error.errors)) {
        // Format: ["email: Email is already taken", "username: Username is required"]
        error.error.errors.forEach((err: string) => {
          const [field, message] = err.split(':').map((s) => s.trim());
          if (field && message) {
            errors[field] = message;
          }
        });
      } else if (typeof error.error.errors === 'object') {
        // Format: { email: "Email is already taken", username: "Username is required" }
        Object.keys(error.error.errors).forEach((field) => {
          errors[field] = error.error.errors[field];
        });
      }
    }

    // Check if error response contains validation details
    if (error?.error?.details) {
      Object.keys(error.error.details).forEach((field) => {
        errors[field] = error.error.details[field];
      });
    }

    // Handle specific field errors from message
    if (error?.error?.message) {
      const message = error.error.message.toLowerCase();

      // Common validation patterns
      if (message.includes('email') && message.includes('already')) {
        errors[this.selectedRole === 'employer' ? 'companyEmail' : 'email'] =
          'Email is already taken';
      }
      if (message.includes('username') && message.includes('already')) {
        errors['username'] = 'Username is already taken';
      }
      if (message.includes('company') && message.includes('already')) {
        errors['companyName'] = 'Company name is already taken';
      }
      if (message.includes('password') && message.includes('weak')) {
        errors['password'] = 'Password is too weak';
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  onFormSubmit(formData: any): void {
    // Clear previous errors
    this.backendErrors = null;

    this.loadingService.show();
    const isSeeker = this.selectedRole === 'seeker';
    const registerCall = isSeeker
      ? this.authService.registerSeeker(formData)
      : this.authService.registerEmployer(formData);

    registerCall.subscribe({
      next: (res) => {
        if (res.success) {
          this.loadingService.hide();
          this.toast.success(
            res.message ||
              `${isSeeker ? 'Seeker' : 'Employer'} registered successfully!`
          );
          this.router.navigate(['/login']);
        } else {
          this.loadingService.hide();
          this.toast.error(res.message || 'Registration failed');
        }
      },
      error: (err) => {
        this.loadingService.hide();

        // Parse backend errors for form display
        this.backendErrors = this.parseBackendErrors(err);

        // Show general error message if no specific field errors
        if (!this.backendErrors) {
          const errorMsg =
            err?.error?.message ||
            `${isSeeker ? 'Seeker' : 'Employer'} registration failed.`;
          this.toast.error(errorMsg);
        }

        console.error('Registration error:', err);
      },
    });
  }
}
