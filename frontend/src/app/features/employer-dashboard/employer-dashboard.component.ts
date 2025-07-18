import { Component, inject, OnInit } from '@angular/core';
import { StatsCardComponent } from '../../shared/stats-card/stats-card.component';
import { TableModule } from 'primeng/table'
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';


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

  // let baseUrl = 'https://f20c1106ab65.ngrok-free.app/'

  ngOnInit(): void {
    this.employerHttp.getAllJobs().subscribe({
      next: ( jobs: any ) => {
        console.log("jobs fetched, ", jobs )
      }
    })
  }
  
  jobsArray: any = [
      {
        "Job Title": "Frontend Developer",
        "Applicants": 24,
        "Job Type": "Full-Time",
        "Action": "View"
      },
      {
        "Job Title": "Backend Engineer",
        "Applicants": 18,
        "Job Type": "Contract",
        "Action": "View"
      },
      {
        "Job Title": "UI/UX Designer",
        "Applicants": 12,
        "Job Type": "Part-Time",
        "Action": "View"
      },
      {
        "Job Title": "DevOps Specialist",
        "Applicants": 30,
        "Job Type": "Full-Time",
        "Action": "View"
      },
      {
        "Job Title": "Data Analyst",
        "Applicants": 15,
        "Job Type": "Internship",
        "Action": "View"
      }
    ];

  openJobDetailsModalForm() {
    console.log("see all clicked")
    this.modalService.showJobDetailsFormModal = true 
  }

applications = [
  {
    jobTitle: 'Frontend Developer',
    applicants: 25,
    jobType: 'Full-time',
    action: 'View'
  },
  {
    jobTitle: 'Backend Developer',
    applicants: 18,
    jobType: 'Contract',
    action: 'View'
  },
  {
    jobTitle: 'UI/UX Designer',
    applicants: 12,
    jobType: 'Part-time',
    action: 'View'
  },
  {
    jobTitle: 'DevOps Engineer',
    applicants: 30,
    jobType: 'Full-time',
    action: 'View'
  },
  {
    jobTitle: 'QA Analyst',
    applicants: 9,
    jobType: 'Internship',
    action: 'View'
  }
];

}
