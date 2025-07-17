import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActionModalComponent } from '../../../components/action-modal/action-modal.component';

@Component({
  selector: 'app-seeker-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, ActionModalComponent],
  templateUrl: './seeker-nav.component.html',
  styleUrl: './seeker-nav.component.scss',
})
export class SeekerNavComponent {
  showDropdown = false;
  showLogoutModal = false;

  constructor(private elRef: ElementRef) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onLogoutClick() {
    this.showDropdown = false;
    this.showLogoutModal = true;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.logout();
  }

  logout() {
    // TODO: Implement logout logic
    console.log('Logout confirmed');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navActions = this.elRef.nativeElement.querySelector('.nav-actions');
    if (this.showDropdown && navActions && !navActions.contains(event.target as Node)) {
      this.showDropdown = false;
    }
  }
}
