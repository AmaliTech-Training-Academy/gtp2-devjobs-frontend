import { Component, inject, DestroyRef } from '@angular/core';
import { StepperModule } from 'primeng/stepper'
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalsServiceService } from '../../core/services/modals-service.service';
import { EmployerHttpRequestsService } from '../../core/services/employer-http-requests.service';



@Component({
  selector: 'app-create-job-modal',
  imports: [StepperModule, ButtonModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './create-job-modal.component.html',
  styleUrl: './create-job-modal.component.scss'
})
export class CreateJobModalComponent {

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )

  destroyRef = inject( DestroyRef )



  firstJobForm = new FormGroup({
    jobTitle: new FormControl('', Validators.required),
    jobType: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)

  })

  formBuilder = inject( FormBuilder )
  secondJobForm: FormGroup

  constructor() {
    this.secondJobForm = this.formBuilder.group({
      additionalJobDetails: this.formBuilder.array([ this.createAdditionalJobData()])
    })
  }


  createAdditionalJobData() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      title: ['', Validators.required]
    })
  }

  get getAdditionalJobData() {
    return this.secondJobForm.get('additionalJobDetails') as FormArray
  }


  addAdditionalJobData() {
    this.getAdditionalJobData.push( this.createAdditionalJobData())
  }


  deleteAdditionalJobData( index: number ) {
    if( this.getAdditionalJobData.length > 1 ) {
      this.getAdditionalJobData.removeAt( index )
    }
  }

  currentStep = 1

  goNext(){
    if( this.currentStep < 2 ) {
      this.currentStep++
    }
  }

  goBack() {
    if ( this.currentStep > 1 ) {
      this.currentStep--
    }
  }

  


  postJob() {
    // this.markFormGroupTouched( this.firstJobForm )
    // this.markFormGroupTouched( this.secondJobForm )

    // if( this.firstJobForm.invalid || this.secondJobForm.invalid ) {
    //   return
    // }
    // else {
      const combinedJobData = {
        ...this.firstJobForm.value,
        ...this.secondJobForm.value
      }

      console.log( "combined data = ", combinedJobData )
    // }


    this.employerHttp.createNewJob(combinedJobData).subscribe({
      next: ( newJob ) => console.log('job created', newJob)
    })

  }


  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }



  closeJobCreationModal() {
    this.modalService.closeCreateJobFormModal()
  }






}
