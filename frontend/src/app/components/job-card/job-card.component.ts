import { Component, Input, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../model/all.jobs';
import { JobService } from '../../core/services/job-service/job.service';

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

  onCardClick(job: Job) {
    this.jobService.setSelectedJob(job);
    this.router.navigate(['seeker/dashboard/job-details']);
  }

  getTimeAgo(timestamp: string | Date): string {
    const date =
      typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (seconds < 60) {
      return `${seconds} s`;
    } else if (minutes < 60) {
      return `${minutes} min`;
    } else if (hours < 24) {
      return `${hours} hr`;
    } else if (days < 30) {
      return `${days} d`;
    } else if (weeks < 4) {
      return `${weeks} w`;
    } else if (months < 12) {
      return `${months} mo`;
    } else {
      return `${years} y`;
    }
  }
}
