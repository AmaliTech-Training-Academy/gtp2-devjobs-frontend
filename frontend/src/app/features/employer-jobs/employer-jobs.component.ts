import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateJobModalComponent } from '../../shared/create-job-modal/create-job-modal.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ModalsServiceService } from '../../core/services/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';

import { EmployerHttpRequestsService } from '../../core/services/employer-http-requests.service';


@Component({
  selector: 'app-employer-jobs',
  imports: [ ButtonModule, CreateJobModalComponent, EmptyStateComponent, DataTableComponent, JobDetailsModalComponent ],
  templateUrl: './employer-jobs.component.html',
  styleUrl: './employer-jobs.component.scss'
})
export class EmployerJobsComponent {

  modalService = inject( ModalsServiceService )

  employerHttp = inject( EmployerHttpRequestsService )


  properties: any [] = ["Job Title", "Job Type", "Date", "Salary", "Location", "Action"]

  jobs = [
    {
      "Job Title": "Frontend Developer",
      "Job Type": "Full-Time",
      "Date": "2025-07-10",
      "Salary": 60000,
      "Location": "Accra, Ghana",
      "Action": "View"
    },
    {
      "Job Title": "Backend Engineer",
      "Job Type": "Contract",
      "Date": "2025-07-08",
      "Salary": 70000,
      "Location": "Kumasi, Ghana",
      "Action": "View"
    },
    {
      "Job Title": "UI/UX Designer",
      "Job Type": "Part-Time",
      "Date": "2025-07-05",
      "Salary": 45000,
      "Location": "Lagos, Nigeria",
      "Action": "View"
    },
    {
      "Job Title": "DevOps Engineer",
      "Job Type": "Full-Time",
      "Date": "2025-07-01",
      "Salary": 80000,
      "Location": "Nairobi, Kenya",
      "Action": "View"
    },
    {
      "Job Title": "Mobile Developer",
      "Job Type": "Internship",
      "Date": "2025-06-28",
      "Salary": 20000,
      "Location": "Cape Town, South Africa",
      "Action": "View"
    },
    {
      "Job Title": "Data Analyst",
      "Job Type": "Full-Time",
      "Date": "2025-06-25",
      "Salary": 55000,
      "Location": "Lusaka, Zambia",
      "Action": "View"
    },
    {
      "Job Title": "Project Manager",
      "Job Type": "Contract",
      "Date": "2025-06-22",
      "Salary": 75000,
      "Location": "Abuja, Nigeria",
      "Action": "View"
    },
    {
      "Job Title": "QA Tester",
      "Job Type": "Part-Time",
      "Date": "2025-06-20",
      "Salary": 40000,
      "Location": "Accra, Ghana",
      "Action": "View"
    },
    {
      "Job Title": "System Administrator",
      "Job Type": "Full-Time",
      "Date": "2025-06-18",
      "Salary": 62000,
      "Location": "Kigali, Rwanda",
      "Action": "View"
    },
    {
      "Job Title": "Machine Learning Engineer",
      "Job Type": "Full-Time",
      "Date": "2025-06-15",
      "Salary": 90000,
      "Location": "Johannesburg, South Africa",
      "Action": "View"
    }
  ];


  openJobCreationModal() {
    this.modalService.openCreateJobFormModal()
  }


  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
  }



  openJobCreationModal() {
    this.modalService.openCreateJobFormModal()
  }


}
