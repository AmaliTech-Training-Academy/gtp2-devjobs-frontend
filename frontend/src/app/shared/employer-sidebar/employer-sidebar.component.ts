import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../core/services/authservice/auth.service';

@Component({
  selector: 'app-employer-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './employer-sidebar.component.html',
  styleUrl: './employer-sidebar.component.scss',
})
export class EmployerSidebarComponent {
  constructor(private authService: Auth) {}
  logout() {
    this.authService.logout();
  }
}
