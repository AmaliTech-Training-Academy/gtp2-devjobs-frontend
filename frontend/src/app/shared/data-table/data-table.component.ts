
import { Component, Input, inject, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() columns: any = ["Job Title", "Applicants", "Job Type", "Action"]
  @Input() jobsArray: any = []
  @Input() onOpenModal: any

  @Output() emitApplication = new EventEmitter()

  filterArray: any = []
  filterTerm = new FormControl('')


  modalService = inject( ModalsServiceService )

  ngOnInit(): void {
    this.filterArray = this.jobsArray
    this.handleSearch()
  }


  handleSearch() {
    this.filterTerm.valueChanges
    .pipe( debounceTime( 300 ))
    .subscribe({
      next: ( searchTerm ) => {
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
  }


  viewApplicationClicked(application: any) {
      this.emitApplication.emit( application )
  }


  editApplicationClicked(job: any) {
    
    // Optional: close the overlay
  }





}
