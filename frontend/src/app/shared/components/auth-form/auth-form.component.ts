import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isRegister = false;
  @Input() userType: 'seeker' | 'employer' = 'seeker';
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userType'] || changes['isRegister']) {
      this.initializeForm();

      // Re-trigger change detection after input switches
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.isRegister) {
      if (this.userType === 'seeker') {
        this.form.addControl('name', this.fb.control('', Validators.required));
        this.form.addControl(
          'username',
          this.fb.control('', Validators.required)
        );
      } else if (this.userType === 'employer') {
        this.form.addControl(
          'companyName',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'username',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'companyEmail',
          this.fb.control('', [Validators.required, Validators.email])
        );
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
