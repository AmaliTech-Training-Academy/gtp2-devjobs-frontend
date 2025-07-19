
import { Component, OnInit } from '@angular/core';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApplicationActionDataTableComponent } from '../../shared/application-action-data-table/application-action-data-table.component'



@Component({
  selector: 'app-employer-applications',
  imports: [ EmptyStateComponent, DataTableComponent, ApplicationActionDataTableComponent ],
  templateUrl: './employer-applications.component.html',
  styleUrl: './employer-applications.component.scss'
})

export class EmployerApplicationsComponent implements OnInit {
    applications: any[] = [
  {
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
  },
  {
    "Job Title": "Marketing Assistant",
    "Applicants": 6,
    "Job Type": "PART_TIME",
    "Action": "View"
  }
]

    
    activeTab: 'incoming' | 'statuses' = 'incoming';

    secondActiveTab: 'reviewed' | 'interviewed' | 'rejected' = 'reviewed';

    showSecondActiveTab: boolean = false;

    columns: string [] = ["Job Title", "Applicants", "Job Type", "Action"]

    applicationActionsColumn: string [] = ["Applicant", "Applied", "Action", "Status"]

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

    setActive(tab: 'incoming' | 'statuses') {
      this.activeTab = tab;
      this.toggleSecondActiveTab()
      // alert( this.activeTab )
      console.log( this.activeTab )
      
    }


    setSecondActiveTab( tab:'reviewed' | 'interviewed' | 'rejected' ) {
      this.secondActiveTab = tab
      console.log( this.secondActiveTab )
    }

    toggleSecondActiveTab() {
      this.showSecondActiveTab = !this.showSecondActiveTab
    }

    ngOnInit(): void {
      console.log( this.activeTab )
    }



}
