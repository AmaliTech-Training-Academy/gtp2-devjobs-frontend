import { Component } from '@angular/core';
import { EmployerNavbarComponent } from '../../shared/employer-navbar/employer-navbar.component';
import { EmployerSidebarComponent } from '../../shared/employer-sidebar/employer-sidebar.component';

@Component({
  selector: 'app-employer-dashboard',
  imports: [ EmployerNavbarComponent, EmployerSidebarComponent ],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent {

}
