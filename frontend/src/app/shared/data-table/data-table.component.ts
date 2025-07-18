
import { Component, Input, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { debounceTime } from 'rxjs';
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';



@Component({
  selector: 'app-data-table',
  imports: [ TableModule, PaginatorModule, ButtonModule, ReactiveFormsModule,
             MenuModule, CommonModule, PopoverModule, OverlayPanelModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
<<<<<<< HEAD
  @Input() columns: any = ["Job Title", "Applicants", "Job Type", "Action"]
  @Input() jobsArray: any = []
=======

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
>>>>>>> 79c735c5f1bd82695bbb35d1dcf910962ca80e14
    
  // @Input() properties: string [] = ["Job Title", "Applicants", "Job Type", "Action"]
  @Input() onOpenModal: any


  filterArray: any = []
  filterTerm = new FormControl('')


  modalService = inject( ModalsServiceService )

  ngOnInit(): void {
    this.filterArray = this.jobsArray
    console.log("filter array = ", this.filterArray )

    this.handleSearch()
  }


  handleSearch() {
    this.filterTerm.valueChanges
    .pipe( debounceTime( 300 ))
    .subscribe({
      next: ( searchTerm ) => {
        console.log(searchTerm)
        if(!searchTerm) {
          this.filterArray = this.jobsArray
        }
        else {
          const term = searchTerm.toLowerCase()
          this.filterArray = this.jobsArray.filter(( job: any ) => {
            return Object.values( job ).some( value => String( value ).toLowerCase().includes( term ))
          })
        }
      }
    })
  }


  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
    console.log("row clicked")
  }


  viewJob(job: any) {
    console.log('Viewing job:', job);
    // Optional: close the overlay
  }


  editJob(job: any) {
    console.log('Editing job:', job);
    // Optional: close the overlay
  }





}
