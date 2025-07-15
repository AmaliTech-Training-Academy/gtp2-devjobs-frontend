import { Component } from '@angular/core';
import { SearchComponent } from '../../../components/search/search.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seeker-dashboard',
  imports: [SearchComponent, RouterOutlet],
  templateUrl: './seeker-dashboard.component.html',
  styleUrl: './seeker-dashboard.component.scss'
})
export class SeekerDashboardComponent {

}
