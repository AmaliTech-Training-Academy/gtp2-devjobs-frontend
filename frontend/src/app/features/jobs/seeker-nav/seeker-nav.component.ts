import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActionModalComponent } from '../../../components/action-modal/action-modal.component';
import { Auth } from '../../../core/services/authservice/auth.service';

@Component({
  selector: 'app-seeker-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, ActionModalComponent],
  templateUrl: './seeker-nav.component.html',
  styleUrl: './seeker-nav.component.scss',
})
export class SeekerNavComponent {
  private authService = inject(Auth);
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
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const navActions = this.elRef.nativeElement.querySelector('.nav-actions');
    if (
      this.showDropdown &&
      navActions &&
      !navActions.contains(event.target as Node)
    ) {
      this.showDropdown = false;
    }
  }
}
