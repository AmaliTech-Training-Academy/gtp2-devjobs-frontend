import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsServiceService {

  constructor() { }

  showCreateJobFormModal: boolean = false;

  createOrUpdateJobActionType: string = 'Create'

  setJobFormActionTypeToCreate() {
    this.createOrUpdateJobActionType = 'Create'
  }

  setJobFormActionTypeToUpdate() {
    this.createOrUpdateJobActionType = 'Update'
  }

  openCreateJobFormModal() {
    this.showCreateJobFormModal = true
  }

  closeCreateJobFormModal() {
    this.showCreateJobFormModal = false
  }


  showJobDetailsFormModal: boolean = false
  
  openJobDetailsFormModal() {
    this.showJobDetailsFormModal = true
  }

  closeJobDetailsFormModal() {
    this.showJobDetailsFormModal = false
  }



}
