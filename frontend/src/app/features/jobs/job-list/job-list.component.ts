import { Component } from '@angular/core';
import { SortFilterComponent } from '../../../components/sort-filter/sort-filter.component';
import { JobCardComponent } from '../../../components/job-card/job-card.component';

@Component({
  selector: 'app-job-list',
  imports: [SortFilterComponent, JobCardComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {

}
