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
  @Input() jobsArray: any = []
  @Input() fields: string [] = []
  @Input() onOpenModal: any


  modalService = inject( ModalsServiceService )

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
