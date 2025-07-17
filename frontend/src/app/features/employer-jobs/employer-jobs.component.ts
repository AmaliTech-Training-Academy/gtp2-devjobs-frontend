import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateJobModalComponent } from '../../shared/create-job-modal/create-job-modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';


@Component({
  selector: 'app-employer-jobs',
  imports: [ ButtonModule, CreateJobModalComponent, EmptyStateComponent, DataTableComponent ],
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.scss'
})
export class EmployerJobsComponent {

  // create job: Post: /api/v1/jobs
  // get job: GET /api/v1/jobs/employer
  /*update a job posting:
    PUT /api/v1/jobs/{id}
    
    delete a job posting:
    DELETE /api/v1/jobs/{id}
    
    get job posting details:
    GET /api/v1/jobs/{id}*/
 

  jobs = [
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
    { title: "Senior Software Engineer", type: 'Full-time', date: '8/02/2025', salary: 9600, location: 'San francisco' },
  ]

  showJobCreationModal: boolean = false;


  openJobCreationModal() {
    this.showJobCreationModal = true
  }


}
