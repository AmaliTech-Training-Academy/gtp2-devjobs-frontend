import { Component } from '@angular/core';
import { SearchComponent } from '../../../components/search/search.component';
import { RouterLink, RouterOutlet, ActivatedRoute, Router, NavigationEnd, Data, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SeekerNavComponent } from '../../../features/jobs/seeker-nav/seeker-nav.component';

@Component({
  selector: 'app-seeker-dashboard',
  imports: [SearchComponent, SeekerNavComponent, RouterOutlet, RouterLink, AsyncPipe, RouterLinkActive],
  templateUrl: './seeker-dashboard.component.html',
  styleUrl: './seeker-dashboard.component.scss'
})
export class SeekerDashboardComponent {
  showSearch$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.showSearch$ = combineLatest([
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null)
      ),
      this.route.firstChild?.data ?? this.route.data
    ]).pipe(
      map(([_, data]) => data['showSearch'] !== false)
    );
  }
}
