import { Component, Input, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../model/all.jobs';
import { JobService } from '../../core/services/job-service/job.service';
import { getTimeAgo } from '../../shared/utils/common';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule, CardModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: Job;

  router = inject(Router);
  jobService = inject(JobService);

  getTimeAgo = getTimeAgo;

  onCardClick(job: Job) {
    this.jobService.setSelectedJob(job);
    this.router.navigate(['seeker/dashboard/job-details', job.id]);
  }
}
