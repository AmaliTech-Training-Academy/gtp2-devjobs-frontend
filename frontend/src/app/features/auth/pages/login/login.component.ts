import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthFormComponent } from '../../../../shared/components/auth-form/auth-form.component';
import { AuthPublicNavbarComponent } from '../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip/tooltip.component';
import { Auth } from '../../../../core/services/authservice/auth.service';
import { ToastService } from '../../../../shared/utils/toast/toast.service';
import { LoadingService } from '../../../../shared/utils/loading/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AuthFormComponent,
    AuthPublicNavbarComponent,
    TooltipComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../register/register/register.component.scss'],
})
export class LoginComponent {
  isMobile = false;
  backendErrors: { [key: string]: string } | null = null;

  constructor(
    private router: Router,
    private authService: Auth,
    private toast: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
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
        errors['email'] = 'Email is already taken';
      }
      if (message.includes('username') && message.includes('already')) {
        errors['username'] = 'Username is already taken';
      }
      if (
        message.includes('invalid credentials') ||
        message.includes('incorrect')
      ) {
        errors['email'] = 'Invalid email or password';
        errors['password'] = 'Invalid email or password';
      }
      if (message.includes('user not found') || message.includes('not exist')) {
        errors['email'] = 'User not found';
      }
      if (message.includes('password') && message.includes('incorrect')) {
        errors['password'] = 'Incorrect password';
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  onLoginSubmit(formData: any): void {
    const { email, password } = formData;

    // Clear previous errors
    this.backendErrors = null;

    this.loadingService.show();
    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.loadingService.hide();
          this.toast.success(res.message || 'Login successful!');

          // Get user from stored data (extracted from token)
          const user = this.authService.getCurrentUser();
          console.log('User after login:', user); // Debug log

          if (user?.roles?.includes('ROLE_EMPLOYER')) {
            this.router.navigate(['/employer/dashboard']);
          } else if (user?.roles?.includes('ROLE_JOB_SEEKER')) {
            this.router.navigate(['/seeker/dashboard']);
          } else {
            // Fallback - check roles directly from token
            const hasEmployerRole = this.authService.hasRole('ROLE_EMPLOYER');
            const hasSeekerRole = this.authService.hasRole('ROLE_JOB_SEEKER');

            if (hasEmployerRole) {
              this.router.navigate(['/employer/dashboard']);
            } else if (hasSeekerRole) {
              this.router.navigate(['/seeker/dashboard']);
            } else {
              console.warn('No valid role found, redirecting to landing');
              this.router.navigate(['/landing']);
            }
          }
        } else {
          this.loadingService.hide();
          this.toast.error(res.message || 'Login failed');
        }
      },
      error: (err) => {
        this.loadingService.hide();

        // Parse backend errors for form display
        this.backendErrors = this.parseBackendErrors(err);

        // Show general error message if no specific field errors
        if (!this.backendErrors) {
          const errorMsg =
            err?.error?.message || 'Login failed. Please try again.';
          this.toast.error(errorMsg);
        }

        console.error('Login error:', err);
      },
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
