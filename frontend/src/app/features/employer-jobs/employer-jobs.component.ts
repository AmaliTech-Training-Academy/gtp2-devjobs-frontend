import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-employer-jobs',
  imports: [ TableModule, ButtonModule, PaginatorModule ],
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.scss'
})
export class EmployerJobsComponent {

  jobs = [
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
  ]


}
