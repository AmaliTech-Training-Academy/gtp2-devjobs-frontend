import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../../components/search/search.component';

import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { SeekerNavComponent } from '../../../features/jobs/seeker-nav/seeker-nav.component';
import { Params } from '@angular/router';

@Component({
  selector: 'app-seeker-dashboard',
  standalone: true,

  imports: [SearchComponent, SeekerNavComponent, RouterLink, RouterOutlet, AsyncPipe],

  templateUrl: './seeker-dashboard.component.html',
  styleUrl: './seeker-dashboard.component.scss',
})
export class SeekerDashboardComponent implements OnInit {
  showSearch$: Observable<boolean>;

  isApplicationStatus$: Observable<boolean>;
  searchParams: { title: string; location: string } = { title: '', location: '' };

  page = 1;
  size = 10;
  sort?: string;
  title?: string;
  salaryMin?: number;
  salaryMax?: number;
  search: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.showSearch$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child;
      }),
      switchMap(childRoute => childRoute?.data ?? of({} as Record<string, any>)),
      map((data: Record<string, any>) => data['showSearch'] !== false)
    );

    this.isApplicationStatus$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.routeConfig?.path === 'application-status';
      })
    );

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchParams = {
        title: params['title'] || '',
        location: params['location'] || '',
      };
      this.page = params['page'] ? +params['page'] : 1;
      this.size = params['size'] ? +params['size'] : 10;
      this.sort = params['sort'] || undefined;
      this.title = params['title'] || undefined;
      this.salaryMin = params['salaryMin'] ? +params['salaryMin'] : undefined;
      this.salaryMax = params['salaryMax'] ? +params['salaryMax'] : undefined;
    });
  }

  onSearch(params: { title: string; location: string }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        title: params.title || undefined,
        location: params.location || undefined,
        page: 1, // Reset to first page on new search
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        page,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(sort: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        sort,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onTitleChange(title: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        title,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSizeChange(size: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        size,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSalaryRangeChange(range: [number, number]) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        salaryMin: range[0],
        salaryMax: range[1],
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }
}
