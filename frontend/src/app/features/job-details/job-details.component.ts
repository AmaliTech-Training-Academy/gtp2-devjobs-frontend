import { Component } from '@angular/core';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-job-details',
  imports: [BackButtonComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {}
