import { Component } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthPublicNavbarComponent } from '../../../../../shared/components/auth-public-navbar/auth-public-navbar.component';

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
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  stage: 'email' | 'sent' | 'new-password' | 'success' = 'email';
  form!: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
    });
  }

  goBack() {
    if (this.stage === 'sent') {
      this.stage = 'email';
    } else if (this.stage === 'new-password') {
      this.stage = 'sent';
    } else if (this.stage === 'success') {
      this.stage = 'new-password';
    }
  }

  onSubmit() {
    switch (this.stage) {
      case 'email':
        this.stage = 'sent';
        break;
      case 'new-password':
        this.stage = 'success';
        break;
    }
  }

  goToEmail() {
    this.stage = 'new-password';
  }
}
