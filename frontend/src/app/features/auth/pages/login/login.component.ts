import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthFormComponent } from '../../../../shared/components/auth-form/auth-form.component';
import { AuthPublicNavbarComponent } from '../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip/tooltip.component';
import { Auth } from '../../../../core/services/authservice/auth.service';
import { ToastService } from '../../../../shared/utils/toast/toast.service';

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

  constructor(
    private router: Router,
    private authService: Auth,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  onLoginSubmit(formData: any): void {
    const { email, password } = formData;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.toast.success('Login successful!');

        const user = this.authService.getCurrentUser();
        if (user?.roles.includes('ROLE_EMPLOYER')) {
          this.router.navigate(['/employer/dashboard']);
        } else if (user?.roles.includes('ROLE_SEEKER')) {
          this.router.navigate(['/seeker/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.toast.error('Login failed. Please check your credentials.');
        console.error('Login failed:', err);
      },
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
