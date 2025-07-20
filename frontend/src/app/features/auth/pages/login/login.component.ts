import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {
  isMobile = false;
  validationErrors: string[] = [];
  backendErrors: string[] = [];

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
    this.isMobile = window.innerWidth <= 1024;
  }

  onLoginSubmit(formData: any): void {
    const { email, password } = formData;
    this.loadingService.show();
    this.validationErrors = []; // Clear previous errors
    this.backendErrors = []; // Clear previous backend errors

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
          this.handleErrors(res);
        }
      },
      error: (err) => {
        this.loadingService.hide();
        this.handleErrors(err.error);
        console.error('Login error:', err);
      },
    });
  }

  private handleErrors(response: any): void {
    // Handle validation errors from backend
    if (
      response?.errors &&
      Array.isArray(response.errors) &&
      response.errors.length > 0
    ) {
      this.validationErrors = response.errors;
      this.backendErrors = response.errors; // Set backend errors for the form
      this.toast.error(response.errors[0]);
    } else {
      // Handle single error message
      const errorMsg = response?.message || 'Login failed. Please try again.';
      this.toast.error(errorMsg);
      this.backendErrors = [errorMsg]; // Set single error for the form
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
