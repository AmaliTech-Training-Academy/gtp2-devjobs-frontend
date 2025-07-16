import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Job } from '../../model/job';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule, CardModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input() job!: Job
}
