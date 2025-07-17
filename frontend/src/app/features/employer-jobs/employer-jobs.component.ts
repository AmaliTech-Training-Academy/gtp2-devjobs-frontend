import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateJobModalComponent } from '../../shared/create-job-modal/create-job-modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ModalsServiceService } from '../../core/services/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { EmployerHttpRequestsService } from '../../core/services/employer-http-requests.service';

@Component({
  selector: 'app-employer-jobs',
  imports: [ ButtonModule, CreateJobModalComponent, EmptyStateComponent, DataTableComponent, JobDetailsModalComponent ],
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.scss'
})
export class EmployerJobsComponent {

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )

 

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


  openJobCreationModal() {
    this.modalService.openCreateJobFormModal()
  }


  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
  }


}
