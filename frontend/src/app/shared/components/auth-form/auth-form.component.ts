import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { AuthValidators } from '../../utils/validators/auth-validators.util';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isRegister = false;
  @Input() userType: 'seeker' | 'employer' = 'seeker';
  @Input() backendErrors: any = null; // Will receive AuthResponse when there's an error
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  hide = true;

  // Store general error message from backend
  generalErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userType'] || changes['isRegister']) {
      this.initializeForm();
      setTimeout(() => this.cdr.detectChanges());
    }

    // Handle backend errors
    if (changes['backendErrors'] && this.backendErrors) {
      this.handleBackendErrors();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.cdr.detectChanges());
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, AuthValidators.strongPassword()]],
    });

    if (this.isRegister) {
      if (this.userType === 'seeker') {
        this.form.addControl(
          'fullName',
          this.fb.control('', [
            Validators.required,
            AuthValidators.noSuspiciousPatterns(),
          ])
        );
        this.form.addControl(
          'username',
          this.fb.control('', [
            Validators.required,
            AuthValidators.strictUsername(),
          ])
        );
        this.form.addControl(
          'email',
          this.fb.control('', [
            Validators.required,
            AuthValidators.strictEmail(),
          ])
        );
      } else if (this.userType === 'employer') {
        this.form.addControl(
          'companyName',
          this.fb.control('', [
            Validators.required,
            AuthValidators.noSuspiciousPatterns(),
          ])
        );
        this.form.addControl(
          'username',
          this.fb.control('', [
            Validators.required,
            AuthValidators.strictUsername(),
          ])
        );
        this.form.addControl(
          'companyEmail',
          this.fb.control('', [
            Validators.required,
            AuthValidators.strictEmail(),
          ])
        );
      }
    } else {
      this.form.addControl('email', this.fb.control('', [Validators.required]));
      this.form.addControl('rememberMe', this.fb.control(false));
    }
  }

  private handleBackendErrors(): void {
    if (!this.backendErrors) return;

    // Clear previous errors
    this.generalErrorMessage = '';

    // Clear all existing backend errors from form controls
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control && control.errors && control.errors['backend']) {
        const errors = { ...control.errors };
        delete errors['backend'];
        control.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
    });

    // Handle the AuthResponse error structure
    if (this.backendErrors.error && !this.backendErrors.success) {
      // Use the main message from the backend
      this.generalErrorMessage =
        this.backendErrors.message || 'An error occurred. Please try again.';

      // If there are specific field errors in the errors array, handle them
      if (
        this.backendErrors.errors &&
        Array.isArray(this.backendErrors.errors)
      ) {
        this.backendErrors.errors.forEach((error: string) => {
          // Try to map error messages to specific fields if they contain field names
          if (error.toLowerCase().includes('email')) {
            const emailControl =
              this.form.get('email') || this.form.get('companyEmail');
            if (emailControl) {
              emailControl.setErrors({ backend: error });
              emailControl.markAsTouched();
            }
          } else if (error.toLowerCase().includes('username')) {
            const usernameControl = this.form.get('username');
            if (usernameControl) {
              usernameControl.setErrors({ backend: error });
              usernameControl.markAsTouched();
            }
          } else if (error.toLowerCase().includes('password')) {
            const passwordControl = this.form.get('password');
            if (passwordControl) {
              passwordControl.setErrors({ backend: error });
              passwordControl.markAsTouched();
            }
          }
          // If error doesn't match any field, it stays as a general error
        });
      }
    }
  }

  // get the appropriate error message for a field
  getFieldErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    // Check for backend errors first - these take priority
    if (control.errors['backend']) {
      return control.errors['backend'];
    }

    // Handle custom validation errors
    if (control.errors['strictEmail']) {
      return control.errors['strictEmail'];
    }

    if (control.errors['strictUsername']) {
      return control.errors['strictUsername'];
    }

    if (control.errors['strongPassword']) {
      return control.errors['strongPassword'];
    }

    if (control.errors['suspiciousPatterns']) {
      return control.errors['suspiciousPatterns'];
    }

    // Handle standard validation errors
    if (control.errors['required']) {
      return this.getRequiredErrorMessage(fieldName);
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }

    if (control.errors['minlength']) {
      return `Password must be at least 6 characters`;
    }

    return '';
  }

  private getRequiredErrorMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      fullName: 'Full name is required',
      username: 'Username is required',
      email: 'Email is required',
      companyName: 'Company name is required',
      companyEmail: 'Company email is required',
      password: 'Password is required',
    };

    return messages[fieldName] || `${fieldName} is required`;
  }

  // Clear backend errors when user starts typing
  onFieldChange(fieldName: string, event: any): void {
    const control = this.form.get(fieldName);

    // Clear backend errors for this field
    if (control && control.errors && control.errors['backend']) {
      const errors = { ...control.errors };
      delete errors['backend'];
      control.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }

    // Auto-capitalize full name and company name
    if ((fieldName === 'fullName' || fieldName === 'companyName') && control) {
      const currentValue = event.target.value;
      const capitalizedValue = AuthValidators.capitalizeWords(currentValue);
      if (currentValue !== capitalizedValue) {
        control.setValue(capitalizedValue);
      }
    }

    // Clear general error message when user starts typing
    if (this.generalErrorMessage) {
      this.generalErrorMessage = '';
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      const firstInvalidField = Object.keys(this.form.controls).find(
        (field) => this.form.get(field)?.invalid
      );

      if (firstInvalidField) {
        const element = document.querySelector(
          `[formControlName="${firstInvalidField}"]`
        ) as HTMLElement;
        element?.focus();
      }
    }
  }

  goToResetPassword(): void {
    this.router.navigate(['/reset-password']);
  }
}
