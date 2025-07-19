import { Component, Input, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule, TitleCasePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../model/all.jobs';

import { TimeAgoPipe } from '../../shared/utils/time-ago-pipe/time-ago.pipe';



@Component({
  selector: 'app-job-card',
  imports: [CommonModule, CardModule, TimeAgoPipe, TitleCasePipe, CurrencyPipe],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: Job;

  router = inject(Router);

  onCardClick() {
    this.router.navigate(['seeker/dashboard/job-details']);
  }

}
