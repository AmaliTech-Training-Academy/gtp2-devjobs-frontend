import { Component, Input, inject, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-actions-data-table',
  imports: [ TableModule, PaginatorModule, ButtonModule, ReactiveFormsModule,
             MenuModule, CommonModule, PopoverModule, OverlayPanelModule],
  templateUrl: './actions-data-table.component.html',
  styleUrl: './actions-data-table.component.scss',
})
export class ActionsDataTableComponent {
  @Input() columns: any = []
  @Input() jobsArray: any = []

  @Output() openDeleteModal = new EventEmitter<boolean>()

  filterArray: any = []
  filterTerm = new FormControl('')

  modalService = inject( ModalsServiceService )

  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
  }

  openJobCreationModal() {
    this.modalService.createOrUpdateJobActionType = 'Update'
    this.modalService.openCreateJobFormModal()
  }


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


  handleViewClicked(jobData: any) {
    // console.log(jobData)
    this.openJobDetailsFormModal()

  }


  handleEditClicked(jobData: any) {
    // console.log(jobData) Midred is my best friend Yaaaaayyyy!! 
    this.openJobCreationModal()
  }


  handleDeleteClicked(jobData: any) {
    console.log(jobData)
    this.openDeleteModal.emit( true )
  }



}
