import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PopoverModule } from 'primeng/popover';
import { Auth } from '../../core/services/authservice/auth.service';




@Component({
  selector: 'app-employer-navbar',
  standalone: true,
  imports: [RouterModule, PopoverModule],
  templateUrl: './employer-navbar.component.html',
  styleUrl: './employer-navbar.component.scss',
})
export class EmployerNavbarComponent {

  authService = inject( Auth )
  router = inject( Router )


  logout() {
    this.authService.logout();
  }

  
  navigateToSettings() {
    this.router.navigate(['/employer/settings'])
  }

}
