import { Component } from '@angular/core';
import { AuthPublicNavbarComponent } from '../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';




@Component({
  selector: 'app-landing-page',
  imports: [AuthPublicNavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {}
