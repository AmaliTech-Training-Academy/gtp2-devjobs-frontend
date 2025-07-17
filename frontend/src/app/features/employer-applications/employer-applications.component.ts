
import { Component, OnInit } from '@angular/core';

import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-employer-applications',
  imports: [ EmptyStateComponent, DataTableComponent],
  templateUrl: './employer-applications.component.html',
  styleUrl: './employer-applications.component.scss'
})

export class EmployerApplicationsComponent implements OnInit {
    applications: any[] = [
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
]
    activeTab: 'incoming' | 'statuses' = 'incoming';

    secondActiveTab: 'reviewed' | 'interviewed' | 'rejected' = 'reviewed';

    showSecondActiveTab: boolean = false;

    properties: string [] = ["Job Title", "Applicants", "Job Type", "Action"]

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
