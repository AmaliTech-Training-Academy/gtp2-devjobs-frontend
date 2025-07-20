import { Component, inject } from '@angular/core';
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';


@Component({
  selector: 'app-job-details-modal',
  imports: [],
  templateUrl: './job-details-modal.component.html',
  styleUrl: './job-details-modal.component.scss'
})
export class JobDetailsModalComponent {

  modalService = inject( ModalsServiceService) 


  openJobDetailsFormModal() {
    this.modalService.openJobDetailsFormModal()
  }

  closeJobDetailsFormModal() {
    this.modalService.closeJobDetailsFormModal()
  }


  

}
