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
  validationErrors: string[] = [];
  backendErrors: string[] = [];

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
    this.isMobile = window.innerWidth <= 1024;
  }

  switchRole(role: 'seeker' | 'employer') {
    this.selectedRole = role;
    this.currentTipIndex = 0;
    this.validationErrors = []; // Clear errors when switching roles
    this.backendErrors = []; // Clear backend errors when switching roles
  }

  onFormSubmit(formData: any): void {
    this.loadingService.show();
    this.validationErrors = []; // Clear previous errors
    this.backendErrors = []; // Clear previous backend errors

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
          this.handleErrors(res);
        }
      },
      error: (err) => {
        this.loadingService.hide();
        this.backendErrors = err.error;
        console.error('Registration error:', err);
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
      const isSeeker = this.selectedRole === 'seeker';
      const errorMsg =
        response?.message ||
        `${isSeeker ? 'Seeker' : 'Employer'} registration failed.`;
      this.toast.error(errorMsg);
      this.backendErrors = [errorMsg]; // Set single error for the form
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
