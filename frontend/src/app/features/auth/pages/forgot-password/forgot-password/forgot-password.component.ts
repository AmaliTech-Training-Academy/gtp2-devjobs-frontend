import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthPublicNavbarComponent } from '../../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { BackButtonComponent } from '../../../../../shared/back-button/back-button.component';
import { Auth } from '../../../../../core/services/authservice/auth.service';
import { ToastService } from '../../../../../shared/utils/toast/toast.service';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIcon,
    AuthPublicNavbarComponent,
    BackButtonComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  stage: 'email' | 'sent' | 'new-password' | 'success' = 'email';
  form!: FormGroup;
  hide: boolean = true;
  private resetToken: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: Auth,
    private toast: ToastService
  ) {
    this.initForm();
  }

  ngOnInit() {
    // Check if we have a reset token in the URL
    this.resetToken = this.route.snapshot.paramMap.get('token');

    if (this.resetToken) {
      // User clicked the reset link from email, go directly to new-password stage
      this.stage = 'new-password';
    }
  }

  initForm() {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom password validator
  passwordValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const isLengthValid = value.length >= 8;

    const valid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isLengthValid;

    if (!valid) {
      return { passwordStrength: true };
    }

    return null;
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Clear the error if passwords match
      const confirmPasswordControl = group.get('confirmPassword');
      if (confirmPasswordControl?.hasError('passwordMismatch')) {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    }
  }

  goBack() {
    if (this.stage === 'sent') {
      this.stage = 'email';
    } else if (this.stage === 'new-password') {
      // If user came from reset link, redirect to login
      if (this.resetToken) {
        this.router.navigate(['/login']);
      } else {
        this.stage = 'sent';
      }
    } else if (this.stage === 'success') {
      this.stage = 'new-password';
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    switch (this.stage) {
      case 'email':
        this.sendForgotPasswordRequest();
        break;
      case 'new-password':
        this.resetPassword();
        break;
    }
  }

  private sendForgotPasswordRequest() {
    const email = this.form.get('email')?.value;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.stage = 'sent';
          this.toast.success(
            'Password reset link has been sent to your email.'
          );
        } else {
          this.toast.error(response.message || 'Failed to send reset link.');
        }
      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage =
          error.error?.message ||
          'Failed to send reset link. Please try again.';
        this.toast.error(errorMessage);
      },
    });
  }

  private resetPassword() {
    if (!this.resetToken) {
      this.toast.error('Invalid reset token. Please request a new reset link.');
      this.router.navigate(['/forgot-password']);
      return;
    }

    const newPassword = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    this.authService
      .resetPassword(this.resetToken, newPassword, confirmPassword)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.stage = 'success';
            this.toast.success('Password has been reset successfully!');
          } else {
            this.toast.error(response.message || 'Failed to reset password.');
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMessage =
            error.error?.message ||
            'Failed to reset password. Please try again.';
          this.toast.error(errorMessage);

          // If token is invalid or expired, redirect to forgot password
          if (error.status === 400 || error.status === 401) {
            setTimeout(() => {
              this.router.navigate(['/forgot-password']);
            }, 2000);
          }
        },
      });
  }

  goToEmail() {
    // This is for demo purposes - in real app, this would open their email client
    this.stage = 'new-password';
  }

  get isEmailStage() {
    return this.stage === 'email';
  }

  get isSentStage() {
    return this.stage === 'sent';
  }

  get isNewPasswordStage() {
    return this.stage === 'new-password';
  }

  get isSuccessStage() {
    return this.stage === 'success';
  }

  get passwordErrors() {
    const passwordControl = this.form.get('password');
    if (!passwordControl?.errors || !passwordControl?.touched) {
      return null;
    }

    return passwordControl.errors;
  }
}
