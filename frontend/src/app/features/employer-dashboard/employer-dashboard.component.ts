import { Component, inject, OnInit } from '@angular/core';
import { Component, inject, OnInit } from '@angular/core';
import { StatsCardComponent } from '../../shared/stats-card/stats-card.component';
import { TableModule } from 'primeng/table'
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';


@Component({
  selector: 'app-employer-dashboard',
  imports: [ StatsCardComponent, TableModule, JobDetailsModalComponent, DataTableComponent ],
  imports: [ StatsCardComponent, TableModule, JobDetailsModalComponent, DataTableComponent ],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent implements OnInit {
export class EmployerDashboardComponent implements OnInit {

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )

  columns: any = ["Job Title", "Applicants", "Job Type", "Action"]

  jobsArray: any = [
  employerHttp = inject( EmployerHttpRequestsService )

  columns: any = ["Job Title", "Applicants", "Job Type", "Action"]

  jobsArray: any = [
  {
    "Job Title": "Frontend Developer",
    "Applicants": 24,
    "Job Type": "FULL_TIME",
    "Action": "View"
    "Job Title": "Frontend Developer",
    "Applicants": 24,
    "Job Type": "FULL_TIME",
    "Action": "View"
  },
  {
    "Job Title": "Data Analyst Intern",
    "Applicants": 15,
    "Job Type": "PART_TIME",
    "Action": "View"
  },
  {
    "Job Title": "Product Manager",
    "Applicants": 38,
    "Job Type": "FULL_TIME",
    "Action": "View"
    "Job Title": "Data Analyst Intern",
    "Applicants": 15,
    "Job Type": "PART_TIME",
    "Action": "View"
  },
  {
    "Job Title": "Product Manager",
    "Applicants": 38,
    "Job Type": "FULL_TIME",
    "Action": "View"
  },
  {
    "Job Title": "Remote UX Designer",
    "Applicants": 9,
    "Job Type": "REMOTE",
    "Action": "View"
  },
  {
    "Job Title": "Contract QA Tester",
    "Applicants": 12,
    "Job Type": "CONTRACT",
    "Action": "View"
    "Job Title": "Contract QA Tester",
    "Applicants": 12,
    "Job Type": "CONTRACT",
    "Action": "View"
  },
  {
    "Job Title": "Marketing Assistant",
    "Applicants": 6,
    "Job Type": "PART_TIME",
    "Action": "View"
  }
  ];

  
  ngOnInit(): void {
    this.employerHttp.getAllJobs().subscribe({
      next: ( jobs: any ) => {
        console.log("jobs fetched, ", jobs.data.content )
        this.jobsArray = jobs.data.content
        console.log("jobs array = ", this.jobsArray)
      },
      error: (err) => {
        console.log("error while fetching jobs ", err)
      }
    })
  }
  

}
