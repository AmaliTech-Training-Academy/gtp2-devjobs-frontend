import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateJobModalComponent } from '../../shared/create-job-modal/create-job-modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { ActionsDataTableComponent } from '../../shared/actions-data-table/actions-data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';


@Component({
  selector: 'app-employer-jobs',
  imports: [ ButtonModule, CreateJobModalComponent, 
             EmptyStateComponent, JobDetailsModalComponent, 
             ActionsDataTableComponent, ActionModalComponent ],
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.scss'
})
export class EmployerJobsComponent {

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )

  showDeleteModal: boolean = false;


  columns: any [] = ["Job Title", "Job Type", "Date", "Salary", "Location", "Action"]

  jobs = [{
    "Job Title": "dgkjdh",
    "Job Type": "sjkfd",
    "Date": "2025-12-11",
    "Salary": 5454,
    "Location": "Accra",
    "Action": "View"
  }];


  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
  }



  openJobCreationModal() {
    this.modalService.openCreateJobFormModal()
  }


  handleOpenDeleteModal(event: boolean) {
    // alert("open delete modal")
    console.log( event )
    this.showDeleteModal = true
  }


  handleCloseDeleteModal( event: boolean ) {
    console.log( event )
    this.showDeleteModal = false
  }


}
