import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../../components/search/search.component';
import { JobListComponent } from '../../../features/jobs/job-list/job-list.component';

@Component({
  selector: 'app-landing-joblist',
  imports: [SearchComponent, JobListComponent],
  templateUrl: './landing-joblist.component.html',
  styleUrl: './landing-joblist.component.scss'
})
export class LandingJoblistComponent {
  searchParams: { title: string; location: string } = { title: '', location: '' };

  constructor(private router: Router, private route: ActivatedRoute) {
    // Initialize searchParams from query params
    this.route.queryParams.subscribe(params => {
      this.searchParams = {
        title: params['title'] || '',
        location: params['location'] || ''
      };
    });
  }

  onSearch(params: { title: string; location: string }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        title: params.title,
        location: params.location,
        page: 1 // reset to first page on new search
      },
      queryParamsHandling: 'merge',
    });
  }
}
