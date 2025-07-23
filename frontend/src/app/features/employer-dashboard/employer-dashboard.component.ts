import { Component, inject, OnInit } from '@angular/core';
import { StatsCardComponent } from '../../shared/stats-card/stats-card.component';
import { TableModule } from 'primeng/table'
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { EmployerApplicationsResponse } from '../../model/applicationObject';
import { Application } from '../../model/applicationObject';



@Component({
  selector: 'app-employer-dashboard',
  imports: [ StatsCardComponent, TableModule, JobDetailsModalComponent, DataTableComponent ],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent implements OnInit {

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )

  columns: any = ["Job Title", "Applicants", "Job Type", "Action"]

  totalJobsCount: number = 0
  appliedApplicationsCount = 0
  reviewedApplicationsCount = 0
  rejectedApplicationsCount = 0
  interviewedApplicationsCount = 0

  applicationsArray: any = [];

  
  ngOnInit(): void {
    this.fetchAllEmployerJobs()
    this.fetchAllEmployerApplications()

  }


  fetchAllEmployerApplications() {
    this.employerHttp.getApplications().subscribe({
      next: ( applications: EmployerApplicationsResponse ) => {
        const applicationList = applications.data.content 
        this.calculateRespectiveApplicationsStatusesCount( applicationList )
        console.log("fetched applications = ", applicationList)
        this.applicationsArray = this.transformApplicationsForDataTable( applicationList )
      },
      error: (err) => {
        console.log("error while fetching applications ", err)
      }
    })
  }


  fetchAllEmployerJobs() {
    this.employerHttp.getAllJobs().subscribe({
      next: ( fetchedJobs ) => {
        const jobList = fetchedJobs.data.content
        this.totalJobsCount = jobList.length;
      }
    })
  }


  transformApplicationsForDataTable( fetchedJobs: any[] ) {
    return fetchedJobs.map( application => ({
      id: application.id,
      "Job Title": application.jobPosting.title,
      "Applicants": fetchedJobs.length,
      "Job Type": this.formatEmploymentType(application.jobPosting.employmentType),
      "Action": "View",
    }))
  }


  formatEmploymentType(type: string): string {
    return type.replace('_', ' ').toUpperCase(); 
  }


  formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().split('T')[0]; 
  }

  calculateRespectiveApplicationsStatusesCount(applications: Application[]) {
    applications.forEach( application => {
      if( application.currentStatus === "APPLIED") {
        this.appliedApplicationsCount +=1
      }
      else if( application.currentStatus === "INTERVIEWED") {
        this.interviewedApplicationsCount += 1
      }
      else if ( application.currentStatus === "REVIEWED") {
        this.reviewedApplicationsCount +=1
      }
      else {
        this.rejectedApplicationsCount +=1
      }
    })
  }
  

}





