
import { Component, Input, inject } from '@angular/core';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover'
import { OverlayPanelModule } from 'primeng/overlaypanel'

import { ModalsServiceService } from '../../core/services/modals-service.service';



@Component({
  selector: 'app-data-table',
  imports: [ TableModule, PaginatorModule, ButtonModule, MenuModule, CommonModule, PopoverModule, OverlayPanelModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  @Input() jobsArray: any = [
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
    
  @Input() properties: string [] = ["Job Title", "Applicants", "Job Type", "Action"]
  @Input() onOpenModal: any


  modalService = inject( ModalsServiceService )

  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
    console.log("row clicked")
  }

  // @Input() jobsArray: any = []
  @Input() fields: string [] = []





  viewJob(job: any) {
    console.log('Viewing job:', job);
    // Optional: close the overlay
  }


  editJob(job: any) {
    console.log('Editing job:', job);
    // Optional: close the overlay
  }




}
