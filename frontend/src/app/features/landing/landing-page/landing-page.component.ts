import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPublicNavbarComponent } from '../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { LandingSearchComponent } from '../components/landing-search/landing-search.component';
import { LandingWhatWeDoComponent } from '../components/landing-what-we-do/landing-what-we-do.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    AuthPublicNavbarComponent,
    LandingSearchComponent,
    LandingWhatWeDoComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {}
