import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortFilterComponent } from '../../../components/sort-filter/sort-filter.component';
import { JobCardComponent } from '../../../components/job-card/job-card.component';
import { JobService } from '../../../core/services/job-service/job.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AllJobsResponse, Job } from '../../../model/all.jobs';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../../shared/utils/loading/loading.service';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-job-list',

  imports: [SortFilterComponent, EmptyStateComponent, JobCardComponent, AsyncPipe, PaginationComponent, LoadingSpinnerComponent],

  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent implements OnInit {
  // Remove all @Output()s for state events

  private jobService = inject(JobService);
  private loadingService = inject(LoadingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  jobs$!: Observable<AllJobsResponse>;
  salaryRange: [number, number] = [30000, 800000];
  titleOptions: { label: string, value: string }[] = [];

  // State from query params
  searchParams: { title: string; location: string } = { title: '', location: '' };
  currentPage: number = 1;
  pageSize: number = 10;
  sort?: string;
  selectedTitle?: string;
  salaryMin?: number;
  salaryMax?: number;
  dateRange?: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = {
        title: params['title'] || '',
        location: params['location'] || ''
      };
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.pageSize = params['size'] ? +params['size'] : 10;
      this.sort = params['sort'] || undefined;
      this.selectedTitle = params['title'] || undefined;
      this.salaryMin = params['salaryMin'] ? +params['salaryMin'] : undefined;
      this.salaryMax = params['salaryMax'] ? +params['salaryMax'] : undefined;
      this.dateRange = params['dateRange'] || 'ALL_DATES';
      this.fetchJobs();
    });
  }

  fetchJobs() {
    this.loadingService.show();
    this.jobs$ = this.jobService.getJobs(
      (this.currentPage || 1) - 1,
      this.pageSize || 10,
      this.salaryMin,
      this.salaryMax,
      this.sort,
      this.searchParams.title || undefined,
      undefined, // query is now unused
      this.searchParams.location || undefined,
      this.dateRange // pass dateRange to jobService
    );
    this.jobs$.subscribe({
      next: (res) => {
        
        // Extract unique job titles from the fetched jobs
        const jobs = res?.data?.content || [];
        const uniqueTitles = Array.from(new Set(jobs.map((job: any) => String(job.title)))) as string[];
        this.titleOptions = uniqueTitles.map(title => ({ label: title, value: title }));
        this.loadingService.hide();
      },
      error: () => this.loadingService.hide()
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        page
      },
      queryParamsHandling: 'merge',
    });
  }

  onSalaryRangeChange(range: [number, number]) {
    this.salaryRange = range;
    this.salaryMin = range[0];
    this.salaryMax = range[1];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        salaryMin: range[0],
        salaryMax: range[1],
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(sort: string) {
    this.sort = sort;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        sort: sort,
        page: 1
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
        page: 1
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
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  }

  onDateChange(dateRange: string) {
    this.dateRange = dateRange;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        dateRange: dateRange,
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  }
}
