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

  jobsArray: any = [];

  ngOnInit(): void {
    this.employerHttp.getAllJobs().subscribe({
      next: ( jobs: any ) => {
        console.log("jobs fetched, ", jobs.data.content )
        this.jobsArray = jobs.data.content
        console.log("jobs array = ", this.jobsArray)
      }
    })
  }
  

}
