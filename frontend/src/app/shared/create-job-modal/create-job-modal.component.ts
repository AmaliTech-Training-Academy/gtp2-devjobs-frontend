import { Component, inject, DestroyRef, Input } from '@angular/core';
import { StepperModule } from 'primeng/stepper'
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalsServiceService } from '../../core/services/modalsService/modals-service.service';
import { EmployerHttpRequestsService } from '../../core/services/employerJobCRUDService/employer-http-requests.service';
import { CreateJobPayload } from '../../model/job';
// import { ToastService } from '../../../../shared/utils/toast/toast.service';
// import { LoadingService } from '../../../../shared/utils/loading/loading.service';
import { ToastService } from '../utils/toast/toast.service';
import { LoadingService } from '../utils/loading/loading.service';


@Component({
  selector: 'app-create-job-modal',
  imports: [StepperModule, ButtonModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './create-job-modal.component.html',
  styleUrl: './create-job-modal.component.scss'
})
export class CreateJobModalComponent {

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )
  toastService = inject( ToastService )

  destroyRef = inject( DestroyRef )
  


  firstJobForm = new FormGroup({
    jobTitle: new FormControl('', [Validators.required, Validators.minLength(5)]),
    jobType: new FormControl('FULL_TIME', Validators.required),
    salary: new FormControl('', [Validators.required, Validators.min(1)]),
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
      description: ['', [Validators.required, Validators.minLength(20)]],
      title: ['',[Validators.required, Validators.minLength(5)]]
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


  extractAdditionalJobData() {
    return this.secondJobForm.get('additionalJobDetails') as FormArray
  }



  postJob() {
    this.markFormGroupTouched( this.firstJobForm )
    this.markFormGroupTouched( this.secondJobForm )

    if( this.firstJobForm.invalid || this.secondJobForm.invalid ) {
      return
    }
    else {

      const formArray = this.extractAdditionalJobData()

      const combinedJobData: CreateJobPayload = {
        title: this.firstJobForm.value.jobTitle!,
        descriptions: this.getAdditionalJobData.value,
        location: this.firstJobForm.value.location!,
        employmentType: this.firstJobForm.value.jobType!,
        companyName: this.firstJobForm.value.companyName!,
        salary: Number(this.firstJobForm.value.salary!),
        currency: 'USD',
        // description: this.getAdditionalJobData.value[0].description,
      }

      console.log( "combined data = ", combinedJobData )

      this.employerHttp.createNewJob(combinedJobData).subscribe({
        next: ( newJob ) => {
              console.log('job created', newJob)  
              this.toastService.success('Job Created!!');
          }
      })

      // this.employerHttp.updateJob('11bad137-2d13-433e-83d5-0627fda7493a', combinedJobData).subscribe({
      //   next: ( newJob ) => console.log('job updated', newJob)
      // })

    }



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
