import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../../../../shared/components/auth-form/auth-form.component';
import { AuthPublicNavbarComponent } from '../../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    AuthFormComponent,
    AuthPublicNavbarComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  selectedRole: 'seeker' | 'employer' = 'seeker';
  isMobile = false;
  showTooltip = false;
  currentTipIndex = 0;

  seekerTips = [
    'Tailor your application with a custom cover letter and resume.',
    'Use filters to narrow results by location, salary, job type, and more.',
    'Search anytime without logging in, but applying requires an account.',
    'Try keywords like "frontend", "manager", or "remote" to quickly find relevant jobs.',
  ];

  employerTips = [
    'Enter the full legal name of your company as registered.',
    'Provide a contact number for faster communication if needed.',
    'Tell us how many employees work at your company to personalize your experience.',
    'Providing accurate company information helps build trust with job seekers.',
  ];

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
  }

  onFormSubmit(formData: any) {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }

  nextTip() {
    const tips =
      this.selectedRole === 'seeker' ? this.seekerTips : this.employerTips;
    this.currentTipIndex = (this.currentTipIndex + 1) % tips.length;
  }

  prevTip() {
    const tips =
      this.selectedRole === 'seeker' ? this.seekerTips : this.employerTips;
    this.currentTipIndex =
      this.currentTipIndex === 0 ? tips.length - 1 : this.currentTipIndex - 1;
  }

  getCurrentTip() {
    const tips =
      this.selectedRole === 'seeker' ? this.seekerTips : this.employerTips;
    return tips[this.currentTipIndex];
  }
}
