import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployerNavbarComponent } from '../../shared/employer-navbar/employer-navbar.component';
import { EmployerSidebarComponent } from '../../shared/employer-sidebar/employer-sidebar.component';

@Component({
  selector: 'app-employer-layout',
  imports: [RouterModule, RouterOutlet, EmployerNavbarComponent, EmployerSidebarComponent],
  templateUrl: './employer-layout.component.html',
  styleUrl: './employer-layout.component.scss'
})
export class EmployerLayoutComponent {

}
