import { Component, Input } from '@angular/core';
import { JobDescription } from '../../model/all.jobs';

@Component({
  selector: 'app-job-content',
  imports: [],
  templateUrl: './job-content.component.html',
  styleUrl: './job-content.component.scss',
})
export class JobContentComponent {
  @Input() content!: JobDescription[] | null;
}
