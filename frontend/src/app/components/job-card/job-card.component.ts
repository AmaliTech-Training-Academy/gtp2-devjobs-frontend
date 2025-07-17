
import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Job } from '../../model/job';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-card',
  imports: [CommonModule, CardModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
   @Input() job!: Job

  router = inject(Router);

  onCardClick() {
    this.router.navigate(['seeker/dashboard/job-details']);
  }

}
