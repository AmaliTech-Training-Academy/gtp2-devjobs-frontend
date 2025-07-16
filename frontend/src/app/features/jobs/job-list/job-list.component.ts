import { Component, inject } from '@angular/core';
import { SortFilterComponent } from '../../../components/sort-filter/sort-filter.component';
import { JobCardComponent } from '../../../components/job-card/job-card.component';
import { JobService } from '../../../core/services/job-service/job.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-job-list',
  imports: [SortFilterComponent, JobCardComponent, AsyncPipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent {
  private jobService = inject(JobService);
   jobs$ = this.jobService.getJobs();
}
