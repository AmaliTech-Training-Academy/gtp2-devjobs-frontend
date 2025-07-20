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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, RouterLink, Router } from '@angular/router';

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
    MatCheckboxModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isRegister = false;
  @Input() userType: 'seeker' | 'employer' = 'seeker';
  @Input() backendErrors: { [key: string]: string } | string[] | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  hide = true;

  // Store general errors that don't map to specific fields
  generalErrors: string[] = [];

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
      this.setBackendErrors();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.cdr.detectChanges());
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.isRegister) {
      if (this.userType === 'seeker') {
        this.form.addControl(
          'fullName',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'username',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'email',
          this.fb.control('', [Validators.required, Validators.email])
        );
      } else if (this.userType === 'employer') {
        this.form.addControl(
          'companyName',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'username',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'companyEmail',
          this.fb.control('', [Validators.required, Validators.email])
        );
      }
    } else {
      this.form.addControl('email', this.fb.control('', [Validators.required]));
      this.form.addControl('rememberMe', this.fb.control(false));
    }
  }

  private setBackendErrors(): void {
    if (!this.backendErrors) return;

    this.generalErrors = [];

    // If backendErrors is an array (e.g. string[])
    if (Array.isArray(this.backendErrors)) {
      this.generalErrors = [...this.backendErrors];
      return;
    }

    // If backendErrors is an object with key-value pairs
    if (
      typeof this.backendErrors === 'object' &&
      !Array.isArray(this.backendErrors)
    ) {
      const errorObj = this.backendErrors as { [key: string]: string };

      Object.keys(errorObj).forEach((fieldName) => {
        const control = this.form.get(fieldName);
        const errorMsg = errorObj[fieldName];

        if (control) {
          control.setErrors({ backend: errorMsg });
          control.markAsTouched();
        } else {
          this.generalErrors.push(errorMsg);
        }
      });
    }
  }

  // Method to get the appropriate error message for a field
  getFieldErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    // Check for backend errors first
    if (control.errors['backend']) {
      return control.errors['backend'];
    }

    // Handle client-side validation errors
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
  onFieldChange(fieldName: string): void {
    const control = this.form.get(fieldName);
    if (control && control.errors && control.errors['backend']) {
      const errors = { ...control.errors };
      delete errors['backend'];
      control.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }

    // Clear general errors when user starts typing
    this.generalErrors = [];
  }
  // Add this method to your AuthFormComponent class
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();

      // Find first invalid field and focus it
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

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
