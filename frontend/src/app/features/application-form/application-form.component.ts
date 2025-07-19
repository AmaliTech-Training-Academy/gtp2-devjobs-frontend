import { Component, OnInit, inject } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReusableFormGroupComponent } from '../../shared/reusable-form-group/reusable-form-group.component';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';
import { Auth } from '../../core/services/authservice/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../core/services/job-service/job.service';

@Component({
  selector: 'app-application-form',
  imports: [
    StepperModule,
    ButtonModule,
    ReusableFormGroupComponent,
    ReactiveFormsModule,
    CommonModule,
    ActionModalComponent,
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent implements OnInit {
  coverLetterFile: File | null = null;
  resumeFile: File | null = null;

  jobService = inject(JobService);
  fb = inject(FormBuilder);
  form!: FormGroup;
  isHoveringResume = false;
  isHoveringCoverLetter = false;
  showAuthModal = false;
  private auth = inject(Auth);
  private router = inject(Router);
  route = inject(ActivatedRoute);
  appId!: string | null;

  ngOnInit(): void {
    this.appId = this.route.snapshot.paramMap.get('id');

    if (!this.auth.isLoggedIn()) {
      this.showAuthModal = true;
    }
    this.form = this.fb.group({
      resume: [null, Validators.required],
      coverLetter: [null, Validators.required],

      experiences: this.fb.array([this.createExperience()]),
      education: this.fb.array([this.createEducation()]),

      contact: this.fb.group({
        phone: [
          '',
          [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
      }),
    });
  }

  currentStep = 1;

  goNext() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getStepClass(step: number): string {
    if (step < this.currentStep) return 'step-completed';
    if (step === this.currentStep) return 'step-active';
    return '';
  }

  phoneIconSvg: string = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.54 2.40234C3.6 3.29234 3.75 4.16234 3.99 4.99234L2.79 6.19234C2.38 4.99234 2.12 3.72234 2.03 2.40234H3.54ZM13.4 14.4223C14.25 14.6623 15.12 14.8123 16 14.8723V16.3623C14.68 16.2723 13.41 16.0123 12.2 15.6123L13.4 14.4223ZM4.5 0.402344H1C0.45 0.402344 0 0.852344 0 1.40234C0 10.7923 7.61 18.4023 17 18.4023C17.55 18.4023 18 17.9523 18 17.4023V13.9123C18 13.3623 17.55 12.9123 17 12.9123C15.76 12.9123 14.55 12.7123 13.43 12.3423C13.33 12.3023 13.22 12.2923 13.12 12.2923C12.86 12.2923 12.61 12.3923 12.41 12.5823L10.21 14.7823C7.38 13.3323 5.06 11.0223 3.62 8.19234L5.82 5.99234C6.1 5.71234 6.18 5.32234 6.07 4.97234C5.7 3.85234 5.5 2.65234 5.5 1.40234C5.5 0.852344 5.05 0.402344 4.5 0.402344Z" fill="#586071"/>
</svg>`;
  emailIconSvg: string = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2.40234C20 1.30234 19.1 0.402344 18 0.402344H2C0.9 0.402344 0 1.30234 0 2.40234V14.4023C0 15.5023 0.9 16.4023 2 16.4023H18C19.1 16.4023 20 15.5023 20 14.4023V2.40234ZM18 2.40234L10 7.39234L2 2.40234H18ZM18 14.4023H2V4.40234L10 9.40234L18 4.40234V14.4023Z" fill="#586071"/>
</svg>
`;
  addressIconSvg: string = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 3.59234L15 8.09234V15.9023H13V9.90234H7V15.9023H5V8.09234L10 3.59234ZM10 0.902344L0 9.90234H3V17.9023H9V11.9023H11V17.9023H17V9.90234H20L10 0.902344Z" fill="#586071"/>
</svg>
`;
  get experiences() {
    return this.form.get('experiences') as FormArray;
  }

  get experiencesFormGroups(): FormGroup[] {
    return this.experiences.controls as FormGroup[];
  }

  get education() {
    return this.form.get('education') as FormArray;
  }

  get educationFormGroups(): FormGroup[] {
    return this.education.controls as FormGroup[];
  }

  get contact(): FormGroup {
    return this.form.get('contact') as FormGroup;
  }

  createExperience(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      job: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createEducation(): FormGroup {
    return this.fb.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      field: ['', Validators.required],
    });
  }

  addExperience() {
    this.experiences.push(this.createExperience());
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  addEducation() {
    this.education.push(this.createEducation());
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  onResumeDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHoveringResume = true;
  }

  onResumeDragLeave(event: DragEvent) {
    this.isHoveringResume = false;
  }

  onResumeDrop(event: DragEvent) {
    event.preventDefault();
    this.isHoveringResume = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.resumeFile = file;
      this.form.patchValue({ resume: file });
    }
  }

  onCoverLetterDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHoveringCoverLetter = true;
  }

  onCoverLetterDragLeave(event: DragEvent) {
    this.isHoveringCoverLetter = false;
  }

  onCoverLetterDrop(event: DragEvent) {
    event.preventDefault();
    this.isHoveringCoverLetter = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.coverLetterFile = file;
      this.form.patchValue({ coverLetter: file });
    }
  }

  onFileSelect(event: Event, type: 'resume' | 'coverLetter') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (type === 'resume') {
        this.resumeFile = file;
        this.form.patchValue({ resume: file });
      } else {
        this.coverLetterFile = file;
        this.form.patchValue({ coverLetter: file });
      }
    }
  }

  removeFile(type: 'resume' | 'coverLetter', event: Event) {
    event.stopPropagation();

    if (type === 'resume') {
      this.resumeFile = null;
      this.form.patchValue({ resume: null });
      this.form.get('resume')?.markAsTouched();
    } else {
      this.coverLetterFile = null;
      this.form.patchValue({ coverLetter: null });
      this.form.get('coverLetter')?.markAsTouched();
    }
  }

  submitForm() {
    // const job = this.jobService.getSelectedJob();
    this.currentStep = 5;

    // console.log('id:', job?.id);
    if (this.form.valid && this.appId) {
      this.jobService
        .postJobApplication(this.form.value, this.appId)
        .subscribe({
          next: (response) => {
            console.log('Application submitted successfully:', response);
          },
          error: (error) => {
            console.error('Error submitting application:', error);
          },
        });
    } else {
      console.log('Form invalid');
      console.log(this.form.value);
    }
  }

  handleAuthModalConfirm(action: 'login' | 'signup') {
    this.showAuthModal = false;
    if (action === 'login') {
      this.router.navigate(['/login']);
    } else if (action === 'signup') {
      this.router.navigate(['/register']);
    }
  }

  handleAuthModalCancel() {
    this.showAuthModal = false;
    this.router.navigate(['/']);
  }
}
