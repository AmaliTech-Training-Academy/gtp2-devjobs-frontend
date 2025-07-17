import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  @Input() private _selectedRole: 'seeker' | 'employer' | 'login' = 'seeker';
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
  loginTips = [
    ' Tailor your application with a custom cover letter and resume.  ',
    'Use filters to narrow results by location, salary, job type, and more.',
    'Search anytime without logging in, but applying requires an account.',
    `   Use keywords in the search bar for better results. <br />
            "Try keywords like 'frontend', 'manager', or 'remote' to quickly
            find relevant jobs."`,
  ];
  @Input()
  set selectedRole(value: 'seeker' | 'employer' | 'login') {
    if (this._selectedRole !== value) {
      this._selectedRole = value;
      this.currentTipIndex = 0;
    }
  }
  get selectedRole(): 'seeker' | 'employer' | 'login' {
    return this._selectedRole;
  }
  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }

  nextTip() {
    const tips =
      this.selectedRole === 'seeker'
        ? this.seekerTips
        : this.selectedRole === 'employer'
        ? this.employerTips
        : this.loginTips;

    this.currentTipIndex = (this.currentTipIndex + 1) % tips.length;
  }

  prevTip() {
    const tips =
      this.selectedRole === 'seeker'
        ? this.seekerTips
        : this.selectedRole === 'employer'
        ? this.employerTips
        : this.loginTips;

    this.currentTipIndex =
      this.currentTipIndex === 0 ? tips.length - 1 : this.currentTipIndex - 1;
  }

  getCurrentTip() {
    const tips =
      this.selectedRole === 'seeker'
        ? this.seekerTips
        : this.selectedRole === 'employer'
        ? this.employerTips
        : this.loginTips;

    return tips[this.currentTipIndex];
  }
}
