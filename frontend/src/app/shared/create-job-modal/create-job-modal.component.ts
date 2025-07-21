import { Component, inject, DestroyRef, Output, EventEmitter, OnInit } from '@angular/core';
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
import { JobSelectionServiceService } from '../../core/services/job-selection-service.service';
// import { LoadingService } from '../utils/loading/loading.service';



@Component({
  selector: 'app-create-job-modal',
  imports: [StepperModule, ButtonModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './create-job-modal.component.html',
  styleUrl: './create-job-modal.component.scss'
})
export class CreateJobModalComponent implements OnInit {

  @Output() jobCreated = new EventEmitter<void>();

  modalService = inject( ModalsServiceService )
  employerHttp = inject( EmployerHttpRequestsService )
  toastService = inject( ToastService )
  jobSelectionService = inject( JobSelectionServiceService )

  destroyRef = inject( DestroyRef )
  job: any
  formRole: 'Create new job' | 'Update job' = 'Create new job'
  

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

  ngOnInit(): void {
    this.jobSelectionService.selectedJob$.subscribe( receivedJob => {
      this.job = receivedJob
      if(!this.job) {
        this.formRole = 'Create new job'
        console.log("job received = ", this.job)
      }
      else {
        this.formRole = 'Update job'
        console.log("job received = ", this.job)
        this.populateFormWithJobData(this.job )
      }
    })
  }


  populateFormWithJobData( job: any ) {
    this.firstJobForm.patchValue({
      jobTitle: job['Job Title'] || '',
      jobType: job['Job Type'] || 'FULL_TIME',
      salary: job['Salary'],
      companyName: job['Company Name'] || '',
      location: job['Location'] || ''
    })


    const descriptions = job['Descriptions'] || []

    // Clear existing FormArray first
    this.getAdditionalJobData.clear();


    descriptions.forEach((desc: any) => {
      this.getAdditionalJobData.push(
        this.formBuilder.group({
          title: [desc.title || '', [Validators.required, Validators.minLength(5)]],
          description: [desc.description || '', [Validators.required, Validators.minLength(20)]]
        })
      );
    });

  }


  createAdditionalJobData() {
    return this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(20)]],
      title: ['',[Validators.required, Validators.minLength(5)]],
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
      }


      this.employerHttp.createNewJob(combinedJobData).subscribe({
        next: ( newJob ) => {
              this.jobCreated.emit()
              this.closeJobCreationModal()
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
    this.job = null
  }






}
