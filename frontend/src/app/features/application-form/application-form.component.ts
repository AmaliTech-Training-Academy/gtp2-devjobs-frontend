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

@Component({
  selector: 'app-application-form',
  imports: [
    StepperModule,
    ButtonModule,
    ReusableFormGroupComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent {
  coverLetterFile: File | null = null;
  resumeFile: File | null = null;

  fb = inject(FormBuilder);
  form!: FormGroup;
  isHoveringResume = false;
  isHoveringCoverLetter = false;

  constructor() {
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

  get experiences() {
    return this.form.get('experiences') as FormArray;
  }

  get experiencesFormGroups(): FormGroup[] {
    return this.experiences.controls as FormGroup[];
  }

  get education() {
    return this.form.get('education') as FormArray;
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
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form invalid');
    }
  }
}
