// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthFormComponent } from '../../../../shared/components/auth-form/auth-form.component';
import { AuthPublicNavbarComponent } from '../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip/tooltip.component';

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

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  onLoginSubmit(formData: any) {
    console.log('Login Submitted:', formData);
    this.router.navigate(['/application-form']);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
