import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LandingSearchComponent } from '../../components/landing-search/landing-search.component';
import { LandingWhatWeDoComponent } from '../../components/landing-what-we-do/landing-what-we-do.component';
import { LandingCardCarouselComponent } from '../../components/landing-card-carousel/landing-card-carousel.component';
import { LandingJobCategoriesComponent } from '../../components/landing-job-categories/landing-job-categories.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule,
    LandingSearchComponent,
    LandingWhatWeDoComponent,
    LandingCardCarouselComponent,
    LandingJobCategoriesComponent,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
