import { Component, inject, OnInit } from '@angular/core';
import { SortFilterComponent } from '../../../components/sort-filter/sort-filter.component';
import { JobCardComponent } from '../../../components/job-card/job-card.component';
import { JobService } from '../../../core/services/job-service/job.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AllJobsResponse, Job } from '../../../model/all.jobs';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-job-list',
  imports: [SortFilterComponent, EmptyStateComponent, JobCardComponent, AsyncPipe, PaginationComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent implements OnInit {
  private jobService = inject(JobService);
  jobs$!: Observable<AllJobsResponse>;
  currentPage = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    // Spring Boot pagination is 0-based
    this.jobs$ = this.jobService.getJobs(this.currentPage - 1, this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchJobs();
  }
}
