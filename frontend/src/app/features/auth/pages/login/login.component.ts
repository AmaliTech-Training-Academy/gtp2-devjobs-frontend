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
import { AuthValidators } from '../../../../shared/utils/validators/auth-validators.util';
import { AuthSanitizer } from '../../../../shared/utils/auth/auth-sanitizer/auth-sanitizer.util';
import { AuthErrorUtils } from '../../../../shared/utils/auth/auth-error/auth-error.utils';

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
  validationErrors: { [key: string]: string } | null = null;
  loginAttempts = 0;
  maxLoginAttempts = 5;
  isRateLimited = false;

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

  private validateLoginForm(formData: any): { [key: string]: string } | null {
    const errors: { [key: string]: string } = {};
    const { email, password } = formData;

    // Email validation
    if (!email || email.trim() === '') {
      errors['email'] = 'Email is required';
    } else if (!AuthValidators.isValidEmail(email)) {
      errors['email'] = 'Please enter a valid email address';
    }

    // Password validation
    if (!password || password.trim() === '') {
      errors['password'] = 'Password is required';
    } else if (password.length < 6) {
      errors['password'] = 'Password must be at least 6 characters long';
    }

    // Check for suspicious patterns in email
    if (email && AuthValidators.containsSuspiciousPatterns(email)) {
      errors['email'] = 'Email contains invalid characters';
    }

    // Rate limiting check
    if (this.loginAttempts >= this.maxLoginAttempts) {
      this.isRateLimited = true;
      errors['general'] = 'Too many login attempts. Please try again later.';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  private handleSuccessfulLogin(res: any): void {
    this.loginAttempts = 0; // Reset attempts on success
    this.isRateLimited = false;
    this.loadingService.hide();
    // this.toast.success(res.message || 'Login successful!');

    // Get user from stored data (extracted from token)
    const user = this.authService.getCurrentUser();
    console.log('User after login:', user);

    const userName = user?.fullName || user?.username || 'User';
    this.toast.loginSuccess(userName);

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
  }

  private handleLoginError(err: any): void {
    this.loginAttempts++;
    this.loadingService.hide();

    // Parse backend errors using the utility
    this.backendErrors = AuthErrorUtils.parseBackendErrors(err, 'seeker');

    // Check if we should implement rate limiting
    if (this.loginAttempts >= this.maxLoginAttempts) {
      this.isRateLimited = true;
      this.toast.maxAttemptsError(this.maxLoginAttempts);

      // Auto-reset after 15 minutes
      setTimeout(() => {
        this.loginAttempts = 0;
        this.isRateLimited = false;
        this.validationErrors = null;
      }, 15 * 60 * 1000);
    }

    // Show general error message if no specific field errors
    if (!this.backendErrors && !this.validationErrors) {
      const errorMsg = err?.error?.message || 'Login failed. Please try again.';
      this.toast.error(errorMsg);
    }

    console.error('Login error:', err);
  }

  onLoginSubmit(formData: any): void {
    // Clear previous errors
    this.backendErrors = null;
    this.validationErrors = null;

    // Sanitize form data
    const sanitizedData = AuthSanitizer.sanitize(formData);

    // Validate form data
    this.validationErrors = this.validateLoginForm(sanitizedData);

    if (this.validationErrors) {
      // Show validation errors
      this.toast.showFormErrors(this.validationErrors);
      return;
    }

    // Check rate limiting
    if (this.isRateLimited) {
      this.toast.rateLimitError(900);
      return;
    }

    const { email, password } = sanitizedData;

    this.loadingService.show();
    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.handleSuccessfulLogin(res);
        } else {
          this.loadingService.hide();
          this.toast.error(res.message || 'Login failed');
        }
      },
      error: (err) => {
        this.handleLoginError(err);
      },
    });
  }

  // Helper method to get all current errors (validation + backend)
  getAllErrors(): { [key: string]: string } | null {
    const allErrors = {
      ...(this.validationErrors || {}),
      ...(this.backendErrors || {}),
    };

    return Object.keys(allErrors).length > 0 ? allErrors : null;
  }

  // Helper method to check if a specific field has an error
  hasFieldError(fieldName: string): boolean {
    return !!(
      this.validationErrors?.[fieldName] || this.backendErrors?.[fieldName]
    );
  }

  // Helper method to get error message for a specific field
  getFieldError(fieldName: string): string | null {
    return (
      this.validationErrors?.[fieldName] ||
      this.backendErrors?.[fieldName] ||
      null
    );
  }

  // Clear errors when user starts typing
  clearFieldError(fieldName: string): void {
    if (this.validationErrors?.[fieldName]) {
      delete this.validationErrors[fieldName];
      if (Object.keys(this.validationErrors).length === 0) {
        this.validationErrors = null;
      }
    }

    if (this.backendErrors?.[fieldName]) {
      delete this.backendErrors[fieldName];
      if (Object.keys(this.backendErrors).length === 0) {
        this.backendErrors = null;
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
