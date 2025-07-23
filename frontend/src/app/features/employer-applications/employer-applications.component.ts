
import { Component, OnInit, inject } from '@angular/core';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApplicationActionDataTableComponent } from '../../shared/application-action-data-table/application-action-data-table.component'
import { EmployerApplicationsResponse } from '../../model/applicationObject';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { ErrorService } from '../../core/services/error.service';



@Component({
  selector: 'app-employer-applications',
  imports: [ EmptyStateComponent, DataTableComponent, ApplicationActionDataTableComponent ],
  templateUrl: './employer-applications.component.html',
  styleUrl: './employer-applications.component.scss'
})


export class EmployerApplicationsComponent implements OnInit {
    applications: any[] = [ ]

    employerHttp = inject( EmployerHttpRequestsService )

    errorHandler = inject( ErrorService )
    
    activeTab: 'incoming' | 'statuses' = 'incoming';

    secondActiveTab: 'reviewed' | 'interviewed' | 'rejected' = 'reviewed';

    showSecondActiveTab: boolean = false;

    columns: string [] = ["Job Title", "Applicants", "Job Type", "Action"]

    applicationActionsColumn: string [] = ["Applicant", "Applied", "Action", "Status"]

    applicationToViewDetails: any

    applicationDetailsArray: any = [

  {
    "Applicant": "Grace Mensah",
    "Applied": "2025-07-12",
    "Action": "Review",
    "Status": "Applied"
  },
  {
    "Applicant": "Kwame Boateng",
    "Applied": "2025-07-10",
    "Action": "Review",
    "Status": "Applied"
  },
  {
    "Applicant": "Linda Owusu",
    "Applied": "2025-07-09",
    "Action": "Review",
    "Status": "Applied"
  },
  {
    "Applicant": "Michael Asare",
    "Applied": "2025-07-13",
    "Action": "Review",
    "Status": "Applied"
  },
  {
    "Applicant": "Akosua Darko",
    "Applied": "2025-07-15",
    "Action": "Review",
    "Status": "Applied"
  }
    ]



    ngOnInit(): void {
      this.fetchAllEmployerApplications()
    }

    fetchAllEmployerApplications() {
      this.employerHttp.getApplications().subscribe({
        next: ( applications: EmployerApplicationsResponse ) => {
          const applicationList = applications.data.content 
          this.applications = this.transformApplicationsForDataTable( applicationList )
        },
        error: (err) => {
          this.errorHandler.handle( err )
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


    setActive(tab: 'incoming' | 'statuses') {
      this.activeTab = tab;
      this.toggleSecondActiveTab()
    }


    setSecondActiveTab( tab:'reviewed' | 'interviewed' | 'rejected' ) {
      this.secondActiveTab = tab
    }

    toggleSecondActiveTab() {
      this.showSecondActiveTab = !this.showSecondActiveTab
    }


    handleViewApplicationClicked(event: Event) {
      this.applicationToViewDetails = event
      this.setActive('statuses')
    }


}
