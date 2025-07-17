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
import { AuthValidators } from '../../../../../shared/utils/validators/auth-validators.util';
import { AuthSanitizer } from '../../../../../shared/utils/auth/auth-sanitizer/auth-sanitizer.util';
import { AuthErrorUtils } from '../../../../../shared/utils/auth/auth-error/auth-error.utils';

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
  registrationAttempts = 0;
  maxRegistrationAttempts = 5;
  isSubmitting = false;
  lastSubmissionTime = 0;
  rateLimitDelay = 2000;

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
    this.backendErrors = null;
    this.registrationAttempts = 0;
  }

  private validateFormData(formData: any): string | null {
    const isSeeker = this.selectedRole === 'seeker';

    if (
      !formData.password ||
      !AuthValidators.isStrongPassword(formData.password)
    ) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (
      !formData.username ||
      !AuthValidators.isValidUsername(formData.username)
    ) {
      return 'Username can only contain letters, numbers, and underscores';
    }

    if (isSeeker) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        return 'Full name must be at least 2 characters long';
      }
      if (!formData.email || !AuthValidators.isValidEmail(formData.email)) {
        return 'Please enter a valid email address';
      }
      if (AuthValidators.containsSuspiciousPatterns(formData.fullName)) {
        return 'Full name contains invalid characters or patterns';
      }
    } else {
      if (!formData.companyName || formData.companyName.trim().length < 2) {
        return 'Company name must be at least 2 characters long';
      }
      if (
        !formData.companyEmail ||
        !AuthValidators.isValidEmail(formData.companyEmail)
      ) {
        return 'Please enter a valid company email address';
      }
      if (AuthValidators.isPersonalEmailDomain(formData.companyEmail)) {
        return 'Please use a business email address, not a personal email';
      }
    }

    return null;
  }

  private checkRateLimit(): boolean {
    const now = Date.now();
    if (now - this.lastSubmissionTime < this.rateLimitDelay) {
      const remainingTime = Math.ceil(
        (this.rateLimitDelay - (now - this.lastSubmissionTime)) / 1000
      );
      this.toast.rateLimitError(remainingTime);
      return false;
    }
    return true;
  }

  onFormSubmit(formData: any): void {
    if (this.isSubmitting) {
      this.toast.error('Form is already being submitted. Please wait.');
      return;
    }

    if (!this.checkRateLimit()) return;

    if (this.registrationAttempts >= this.maxRegistrationAttempts) {
      this.toast.maxAttemptsError(this.maxRegistrationAttempts);
      return;
    }

    const validationError = this.validateFormData(formData);
    if (validationError) {
      this.toast.validationError(validationError);
      return;
    }

    this.backendErrors = null;
    this.isSubmitting = true;
    this.lastSubmissionTime = Date.now();
    this.registrationAttempts++;

    this.loadingService.show();

    const isSeeker = this.selectedRole === 'seeker';
    const sanitizedData = this.sanitizeFormData(formData);

    const registerCall = isSeeker
      ? this.authService.registerSeeker(sanitizedData)
      : this.authService.registerEmployer(sanitizedData);

    registerCall.subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.loadingService.hide();

        if (res.success) {
          this.toast.registrationSuccess(this.selectedRole);
          this.registrationAttempts = 0;

          this.router.navigate(['/login'], {
            queryParams: {
              registered: 'true',
              email: isSeeker ? formData.email : formData.companyEmail,
            },
          });
        } else {
          this.handleRegistrationFailure(res.message || 'Registration failed');
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.loadingService.hide();

        console.error('Registration error:', err);

        this.backendErrors = AuthErrorUtils.parseBackendErrors(
          err,
          this.selectedRole
        );

        if (this.backendErrors) {
          const fieldErrors = Object.keys(this.backendErrors).filter(
            (key) => key !== 'general'
          );
          if (fieldErrors.length > 0) {
            this.toast.error(
              'Please correct the errors in the form and try again.'
            );
          } else if (this.backendErrors['general']) {
            this.toast.error(this.backendErrors['general']);
          }
        } else {
          const errorMsg =
            err?.error?.message ||
            `${
              isSeeker ? 'Job seeker' : 'Employer'
            } registration failed. Please try again.`;
          this.toast.error(errorMsg);
        }

        if (err.status === 0 || err.status === 502 || err.status === 503) {
          this.toast.networkError();
          return;
        }

        if (err.status >= 500) {
          this.toast.serverError();
          return;
        }

        if (this.registrationAttempts >= this.maxRegistrationAttempts - 2) {
          const remaining =
            this.maxRegistrationAttempts - this.registrationAttempts;
          this.toast.error(`${remaining} registration attempts remaining.`);
        }
      },
    });
  }

  private sanitizeFormData(formData: any): any {
    const sanitized = { ...formData };
    Object.keys(sanitized).forEach((key) => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitized[key].trim();
      }
    });
    // Convert email to lowercase
    if (sanitized.email) {
      sanitized.email = sanitized.email.toLowerCase();
    }
    if (sanitized.companyEmail) {
      sanitized.companyEmail = sanitized.companyEmail.toLowerCase();
    }
    // Capitalize first letter of names
    if (sanitized.fullName) {
      sanitized.fullName = AuthSanitizer.capitalize(sanitized.fullName);
    }
    if (sanitized.companyName) {
      sanitized.companyName = AuthSanitizer.capitalize(sanitized.companyName);
    }
    return sanitized;
  }
  private handleRegistrationFailure(message: string): void {
    this.toast.error(message);
    if (this.registrationAttempts >= 3) {
      this.toast.error(
        'Having trouble registering? Please check your information and try again, or contact support if the problem persists.'
      );
    }
  }

  resetRegistrationAttempts(): void {
    this.registrationAttempts = 0;
    this.backendErrors = null;
    this.toast.success('Registration attempts reset. You can try again.');
  }

  canAttemptRegistration(): boolean {
    return (
      this.registrationAttempts < this.maxRegistrationAttempts &&
      !this.isSubmitting
    );
  }
}
