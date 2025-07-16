import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { CreateJobModalComponent } from '../../shared/create-job-modal/create-job-modal.component';


@Component({
  selector: 'app-employer-jobs',
  imports: [ TableModule, ButtonModule, PaginatorModule, CreateJobModalComponent ],
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
  ]

  showJobCreationModal: boolean = false;


  openJobCreationModal() {
    this.showJobCreationModal = true
  }


}
