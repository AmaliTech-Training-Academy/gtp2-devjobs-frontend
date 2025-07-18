import { Component, inject } from '@angular/core';
import { StatsCardComponent } from '../../shared/stats-card/stats-card.component';
import { TableModule } from 'primeng/table'
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobDetailsModalComponent } from '../../shared/job-details-modal/job-details-modal.component';


@Component({
  selector: 'app-employer-dashboard',
  imports: [ StatsCardComponent, TableModule, JobDetailsModalComponent ],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent {

  modalService = inject( ModalsServiceService )

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
