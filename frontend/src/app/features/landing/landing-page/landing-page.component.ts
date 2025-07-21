import { Component } from '@angular/core';
import { AuthPublicNavbarComponent } from '../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { LandingSearchComponent } from '../components/landing-search/landing-search.component';
import { LandingWhatWeDoComponent } from '../components/landing-what-we-do/landing-what-we-do.component';
import { LandingCardCarouselComponent } from '../components/landing-card-carousel/landing-card-carousel.component';
import { LandingJobCategoriesComponent } from '../components/landing-job-categories/landing-job-categories.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AuthPublicNavbarComponent,
    FooterComponent,
    LandingSearchComponent,
    LandingWhatWeDoComponent,
    LandingCardCarouselComponent,
    LandingJobCategoriesComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {}
