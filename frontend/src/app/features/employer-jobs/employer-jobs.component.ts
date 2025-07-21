import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateJobModalComponent } from '../../shared/create-job-modal/create-job-modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { ActionsDataTableComponent } from '../../shared/actions-data-table/actions-data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';
import { EmployerJob } from '../../model/job';

@Component({
  selector: 'app-employer-jobs',
  imports: [ ButtonModule, CreateJobModalComponent, 
             EmptyStateComponent, JobDetailsModalComponent, 
             ActionsDataTableComponent, ActionModalComponent ],
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.scss'
})
export class EmployerJobsComponent implements OnInit{

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )

  showDeleteModal: boolean = false;


  columns: any [] = ["Job Title", "Job Type", "Date", "Salary", "Location", "Action"]

  jobs: any[] = [];


  ngOnInit(): void {
    this.fetchAllEmployerJobs()
  }


  fetchAllEmployerJobs() {
    this.employerHttp.getAllJobs().subscribe({
      next: ( fetchedJobs ) => {
        const jobList = fetchedJobs.data.content 
        this.jobs = this.transformJobsForDataTable(jobList)
        // console.log("from jobs route, jobs fetched, ", this.jobs )
      }
    })
  }


  transformJobsForDataTable( fetchedJobs: EmployerJob[] ) {
    return fetchedJobs.map( employerJob => ({
      id: employerJob.id,
      "Job Title": employerJob.title,
      "Job Type": this.formatEmploymentType(employerJob.employmentType),
      "Date": this.formatDate(employerJob.createdAt),
      "Salary": `$${employerJob.salary.toLocaleString()}`,
      "Location": employerJob.location,
      "Action": "View",
      "Company Name": employerJob.company.companyName,
      "Description": employerJob.description,
      "Descriptions": employerJob.descriptions
    }))
  }



  // Optional helper functions
  formatEmploymentType(type: string): string {
    return type.replace('_', ' ').toUpperCase(); 
  }


  formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().split('T')[0]; // e.g. 2025-07-19
  }
  

  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
  }



  openJobCreationModal() {
    this.modalService.createOrUpdateJobActionType = 'Create'
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
