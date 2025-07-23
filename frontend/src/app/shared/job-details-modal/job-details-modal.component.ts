import { Component, inject, OnInit } from '@angular/core';
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { JobSelectionServiceService } from '../../core/services/job-selection-service.service';


@Component({
  selector: 'app-job-details-modal',
  imports: [],
  templateUrl: './job-details-modal.component.html',
  styleUrl: './job-details-modal.component.scss'
})
export class JobDetailsModalComponent implements OnInit {
  job: any

  modalService = inject( ModalsServiceService) 
  jobSelectionService = inject( JobSelectionServiceService )


  ngOnInit(): void {
    this.jobSelectionService.selectedJob$.subscribe( receivedJob => {
      this.job = receivedJob
    })
  }


  openJobDetailsFormModal() {
    this.modalService.openJobDetailsFormModal()
  }

  closeJobDetailsFormModal() {
    this.modalService.closeJobDetailsFormModal()
  }


  

}
