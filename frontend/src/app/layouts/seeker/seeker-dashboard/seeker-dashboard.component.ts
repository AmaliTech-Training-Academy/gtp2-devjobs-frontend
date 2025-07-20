import { Component } from '@angular/core';
import { SearchComponent } from '../../../components/search/search.component';
import {
  RouterLink,
  RouterOutlet,
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterLinkActive,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SeekerNavComponent } from '../../../features/jobs/seeker-nav/seeker-nav.component';

@Component({
  selector: 'app-seeker-dashboard',
  standalone: true,
  imports: [
    SearchComponent,
    SeekerNavComponent,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './seeker-dashboard.component.html',
  styleUrl: './seeker-dashboard.component.scss',
})
export class SeekerDashboardComponent {
  showSearch$: Observable<boolean>;
  search: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.search = this.route.snapshot.data['search'];
    this.showSearch$ = combineLatest([
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null)
      ),
      this.route.firstChild?.data ?? this.route.data,
    ]).pipe(map(([_, data]) => data['showSearch'] !== false));
  }
}
