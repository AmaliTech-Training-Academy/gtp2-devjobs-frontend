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
  selector: 'app-application-action-data-table',
  imports: [ TableModule, PaginatorModule, ButtonModule, ReactiveFormsModule,
             MenuModule, CommonModule, PopoverModule, OverlayPanelModule],
  templateUrl: './application-action-data-table.component.html',
  styleUrl: './application-action-data-table.component.scss'
})
export class ApplicationActionDataTableComponent {

  @Input() columns: any = []
  @Input() jobsArray: any = []
  @Output() openDeleteModal = new EventEmitter<boolean>()

  filterArray: any = []
  filterTerm = new FormControl('')
  modalService = inject( ModalsServiceService )

  statusOptions = ['Applied', 'Reviewed', 'Interviewed', 'Rejected'];

  handleStatusChange(rowData: any, newStatus: string) {
    rowData['Status'] = newStatus;
  }

  getStatusDotClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied': return 'dot-applied';
      case 'reviewed': return 'dot-reviewed';
      case 'interviewed': return 'dot-interviewed';
      case 'rejected': return 'dot-rejected';
      default: return 'dot-default';
    }
  }

  getStatusTextClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied': return 'status-text-applied';
      case 'reviewed': return 'status-text-reviewed';
      case 'interviewed': return 'status-text-interviewed';
      case 'rejected': return 'status-text-rejected';
      default: return 'status-text-default';
    }
  }

  getStatusDivClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied': return 'status-div-applied';
      case 'reviewed': return 'status-div-reviewed';
      case 'interviewed': return 'status-div-interviewed';
      case 'rejected': return 'status-div-rejected';
      default: return 'status-div-default';
    }
  }




  

  openJobDetailsFormModal() {
    this.modalService.showJobDetailsFormModal = true
  }

  openJobCreationModal() {
    this.modalService.createOrUpdateJobActionType = 'Update'
    this.modalService.openCreateJobFormModal()
  }


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


  handleViewClicked(jobData: any) {
    this.openJobDetailsFormModal()

  }


  handleEditClicked(jobData: any) {
    this.openJobCreationModal()
  }


  handleDeleteClicked(jobData: any) {
    this.openDeleteModal.emit( true )
  }


  
}
