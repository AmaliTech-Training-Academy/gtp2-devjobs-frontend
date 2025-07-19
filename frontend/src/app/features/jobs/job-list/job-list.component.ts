import { Component, inject, OnInit } from '@angular/core';
import { SortFilterComponent } from '../../../components/sort-filter/sort-filter.component';
import { JobCardComponent } from '../../../components/job-card/job-card.component';
import { JobService } from '../../../core/services/job-service/job.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AllJobsResponse, Job } from '../../../model/all.jobs';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-job-list',
  imports: [
    SortFilterComponent,
    EmptyStateComponent,
    JobCardComponent,
    AsyncPipe,
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent implements OnInit {
  private jobService = inject(JobService);
  jobs$!: Observable<AllJobsResponse>;

  ngOnInit(): void {
    this.jobs$ = this.jobService.getJobs();
    this.jobs$.subscribe((data) => console.log('data', data));
  }
}
