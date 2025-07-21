import { Component, inject, OnInit } from '@angular/core';
import { StatsCardComponent } from '../../shared/stats-card/stats-card.component';
import { TableModule } from 'primeng/table'
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { EmployerApplicationsResponse } from '../../model/applicationObject';
import { ApplicationsPagination } from '../../model/applicationObject';



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

  applicationsArray: any = [
  // {
  //   "Job Title": "Frontend Developer",
  //   "Applicants": 24,
  //   "Job Type": "FULL_TIME",
  //   "Action": "View",
  // },
  // {
  //   "Job Title": "Product Manager",
  //   "Applicants": 38,
  //   "Job Type": "FULL_TIME",
  //   "Action": "View",
  // },
  // {
  //   "Job Title": "Product Manager",
  //   "Applicants": 38,
  //   "Job Type": "FULL_TIME",
  //   "Action": "View"
  // },
  // {
  //   "Job Title": "Remote UX Designer",
  //   "Applicants": 9,
  //   "Job Type": "REMOTE",
  //   "Action": "View"
  // }
  ];

  
  ngOnInit(): void {
    // this.fetchAllEmployerApplications()
    this.fetchAllEmployerJobs()
    this.fetchAllEmployerApplications()

  }


  fetchAllEmployerApplications() {
    this.employerHttp.getApplications().subscribe({
      next: ( applications: EmployerApplicationsResponse ) => {
        const applicationList = applications.data.content 
        this.applicationsArray = this.transformApplicationsForDataTable( applicationList )
        console.log("applications array = ", this.applicationsArray)
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
        console.log("total jobs = ", jobList)
        // this.jobsArray = this.transformJobsForDataTable(jobList)
        // console.log("from jobs route, jobs fetched, ", this.jobsArray )
      }
    })
  }


  transformApplicationsForDataTable( fetchedJobs: any[] ) {
    return fetchedJobs.map( application => ({
      id: application.id,
      "Job Title": application.title,
      "Applicants": application.applicants,
      "Job Type": application.employmentType,
      "Action": application.action,
    }))
  }


  formatEmploymentType(type: string): string {
    return type.replace('_', ' ').toUpperCase(); 
  }


  formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().split('T')[0]; 
  }
  

}





