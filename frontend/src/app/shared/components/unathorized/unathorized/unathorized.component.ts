import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthPublicNavbarComponent } from '../../auth-public-navbar/auth-public-navbar.component';

@Component({
  selector: 'app-unathorized',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthPublicNavbarComponent],

  templateUrl: './unathorized.component.html',
  styleUrl: './unathorized.component.scss',
})
export class UnathorizedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
