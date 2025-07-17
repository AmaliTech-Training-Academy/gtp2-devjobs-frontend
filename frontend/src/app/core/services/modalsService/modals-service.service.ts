import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsServiceService {

  constructor() { }

  showCreateJobFormModal: boolean = false;

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
