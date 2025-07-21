import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReusableFormGroupComponent } from '../reusable-form-group/reusable-form-group.component';
import { EmployerProfile, SeekerProfile } from '../../model/profile';
import { ProfileData } from '../../model/all.jobs';
import { JobService } from '../../core/services/job-service/job.service';
import { CompanyProfile } from '../../model/all.jobs';

interface Field {
  label: string;
  controlName: string;
  type: string;
  placeholder: string;
  inlineSvg: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReusableFormGroupComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnChanges, OnInit {
  @Input() seekerProfile: ProfileData | null = null;
  @Input() employer: CompanyProfile | null = null;
  @Input() type: 'employer' | 'seeker' = 'seeker';
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSkills = new EventEmitter<void>();

  profileForm!: FormGroup;
  uploadedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setprofileForm(this.type);
    // if (this.type === 'seeker') {
    //   this.uploadedImage =
    //     'https://gtp2-devjobs-backend-c6aeaf5b.s3.eu-central-1.amazonaws.com/test-uploads/275c5908-5d9e-4e1f-87b4-360b3f1a77c5.png';
    // }
  }

  ngOnInit(): void {
    this.setprofileForm(this.type);
    this.generateFieldGroups();
    // console.log('email object', this.seekerProfile?.email);
  }

  setprofileForm(type: string) {
    if (type === 'seeker') {
      this.profileForm = this.fb.group({
        fullName: [
          this.seekerProfile?.fullName || '',
          [Validators.required, Validators.minLength(5)],
        ],
        phone: [
          this.seekerProfile?.phone || '',
          [Validators.required, Validators.minLength(10)],
        ],
        email: [
          {
            value: this.seekerProfile?.email,
            disabled: true,
          },
        ],
        location: [this.seekerProfile?.location || '', Validators.required],
        profilePicture: [null],
      });
    } else {
      this.profileForm = this.fb.group({
        companyName: [
          this.employer?.companyName || '',
          [Validators.required, Validators.minLength(5)],
        ],
        website: [this.employer?.website || '', [Validators.required]],
        phone: [
          this.employer?.phone || '',
          [Validators.required, Validators.minLength(10)],
        ],
        email: [
          {
            value: this.employer?.email || 'johnDoe@gmail.com',
            disabled: true,
          },
        ],
        location: [this.employer?.location || '', Validators.required],
        size: [this.employer?.companySize || '', [Validators.required]],
        about: [this.employer?.aboutCompany || '', [Validators.required]],
        profilePicture: [null], // add file control
      });
    }
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Uploaded file:', file); // log the file for inspection

      this.profileForm.patchValue({ profilePicture: file });
      this.profileForm.get('profilePicture')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // onSubmit() {
  //   if (this.profileForm.invalid) {
  //     console.log('Form invalid');
  //     console.log(this.profileForm.value);
  //     return;
  //   }

  //   const formData = new FormData();
  //   const data: { [key: string]: any } = {};

  //   Object.keys(this.profileForm.controls).forEach((key) => {
  //     const control = this.profileForm.get(key);
  //     if (!control) return;

  //     const value = control.value;

  //     if (value instanceof File) {
  //       // Append the file separately
  //       formData.append(key, value);
  //     } else if (value && typeof value === 'object' && 'value' in value) {
  //       // Unwrap nested value objects like { value: "some@example.com" }
  //       data[key] = value.value;
  //     } else {
  //       data[key] = value ?? '';
  //     }
  //   });

  //   // Send non-file fields as JSON string under 'data'
  //   formData.append('data', JSON.stringify(data));

  //   console.log('Submitting FormData:');
  //   for (const pair of formData.entries()) {
  //     console.log(pair[0], pair[1]);
  //   }

  //   console.log('Logging form data', formData.values);
  //   this.onSave.emit(formData);
  // }

  onSubmit() {
    if (this.profileForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    // Create FormData and prepare the payload
    const formData = new FormData();
    const profileData: any = {};
    // Process non-file fields
    Object.keys(this.profileForm.controls).forEach(key => {
      if (key !== 'profileImage') {
        const control = this.profileForm.get(key);
        if (control && control.valid) {
          const value = control.value;
          // Handle disabled controls that might be objects
          profileData[key] = (value && typeof value === 'object' && 'value' in value)
            ? value.value
            : value ?? '';
        }
      }
    });
    // Process file upload - must match backend's expected field name
    const profileImage = this.profileForm.get('profileImage')?.value;
    if (profileImage instanceof File) {
      formData.append('profilePicture', profileImage, profileImage.name);
    }
    // Add JSON data - must match backend's expected field name
    formData.append('data', JSON.stringify(profileData));
    // Debug: Log FormData contents
    console.log('FormData contents:');
    for (const pair of (formData as any).entries()) {
      console.log(pair[0], pair[1]);
    }
    this.onSave.emit(formData);
  }

  icons = {
    downSvg: `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.59 0.296875L6 4.87687L1.41 0.296875L0 1.70687L6 7.70687L12 1.70687L10.59 0.296875Z" fill="#586071"/>
</svg>
`,
    nameSvg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 12C10.7 12 13.8 13.29 14 14H2C2.23 13.28 5.31 12 8 12ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="#586071"/>
</svg>
`,

    numberSvg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.54 2C3.6 2.89 3.75 3.76 3.99 4.59L2.79 5.79C2.38 4.59 2.12 3.32 2.03 2H3.54ZM13.4 14.02C14.25 14.26 15.12 14.41 16 14.47V15.96C14.68 15.87 13.41 15.61 12.2 15.21L13.4 14.02ZM4.5 0H1C0.45 0 0 0.45 0 1C0 10.39 7.61 18 17 18C17.55 18 18 17.55 18 17V13.51C18 12.96 17.55 12.51 17 12.51C15.76 12.51 14.55 12.31 13.43 11.94C13.33 11.9 13.22 11.89 13.12 11.89C12.86 11.89 12.61 11.99 12.41 12.18L10.21 14.38C7.38 12.93 5.06 10.62 3.62 7.79L5.82 5.59C6.1 5.31 6.18 4.92 6.07 4.57C5.7 3.45 5.5 2.25 5.5 1C5.5 0.45 5.05 0 4.5 0Z" fill="#586071"/>
</svg>
`,

    emailSvg: `<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 6.99L2 2H18ZM18 14H2V4L10 9L18 4V14Z" fill="#586071"/>
</svg>
`,

    locationSvg: `<svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7C12 9.88 9.12 14.19 7 16.88C4.92 14.21 2 9.85 2 7Z" fill="#586071"/>
<path d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5Z" fill="#586071"/>
</svg>
`,

    linkSvg: `<svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0.5H11V2.5H15C16.65 2.5 18 3.85 18 5.5C18 7.15 16.65 8.5 15 8.5H11V10.5H15C17.76 10.5 20 8.26 20 5.5C20 2.74 17.76 0.5 15 0.5ZM9 8.5H5C3.35 8.5 2 7.15 2 5.5C2 3.85 3.35 2.5 5 2.5H9V0.5H5C2.24 0.5 0 2.74 0 5.5C0 8.26 2.24 10.5 5 10.5H9V8.5ZM6 4.5H14V6.5H6V4.5Z" fill="#586071"/>
</svg>
`,
  };

  public fieldGroups: any[][] = [];

  private generateFieldGroups(): void {
    if (this.type === 'seeker') {
      this.fieldGroups = [
        [
          {
            label: 'Full name',
            controlName: 'fullName',
            type: 'text',
            placeholder: 'John Doe',
            inlineSvg: this.icons.nameSvg,
          },
          {
            label: 'Phone number',
            controlName: 'phone',
            type: 'text',
            placeholder: 'Type your phone number',
            inlineSvg: this.icons.numberSvg,
          },
        ],
        [
          {
            label: 'Email Address',
            controlName: 'email',
            type: 'email',
            placeholder: 'JohnDoe@gmail.com',
            inlineSvg: this.icons.emailSvg,
            disabled: true,
          },
          {
            label: 'Location',
            controlName: 'location',
            type: 'text',
            placeholder: 'Type job location here',
            inlineSvg: this.icons.locationSvg,
          },
        ],
      ];
    } else {
      this.fieldGroups = [
        [
          {
            label: 'Company name',
            controlName: 'companyName',
            type: 'text',
            placeholder: 'Enter company name',
            inlineSvg: this.icons.nameSvg,
          },
          {
            label: 'Location',
            controlName: 'location',
            type: 'text',
            placeholder: 'Type location here',
            inlineSvg: this.icons.locationSvg,
          },
          {
            label: 'Website',
            controlName: 'website',
            type: 'url',
            placeholder: 'paste website link here',
            inlineSvg: this.icons.linkSvg,
          },
          {
            label: 'Email Address',
            controlName: 'email',
            type: 'email',
            placeholder: 'amalitech@training.org',
            inlineSvg: this.icons.emailSvg,
            disabled: true,
          },
        ],
        [
          {
            label: 'About Company',
            controlName: 'about',
            type: 'textarea',
            placeholder: 'Type description here',
          },
          {
            label: 'Company size',
            controlName: 'size',
            type: 'select',
            placeholder: 'select company size',
            inlineSvg: this.icons.downSvg,
            options: ['1-10', '11-50', '51-200', '200+'],
          },
          {
            label: 'Phone number',
            controlName: 'phone',
            type: 'text',
            placeholder: 'Enter phone number',
            inlineSvg: this.icons.numberSvg,
          },
        ],
      ];
    }
  }

  // onImageUpload(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => (this.uploadedImage = reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onSubmit() {
  //   if (this.profileForm.valid) {
  //     this.onSave.emit(this.profileForm.getRawValue());
  //   }
  // }

  cancelForm() {
    this.profileForm.reset();
    this.onCancel.emit();
  }
}
