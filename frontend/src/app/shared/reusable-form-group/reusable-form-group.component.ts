import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reusable-form-group',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './reusable-form-group.component.html',
  styleUrl: './reusable-form-group.component.scss',
})
export class ReusableFormGroupComponent {
  @Input() group!: FormGroup;
  @Input() fields!: {
    label: string;
    controlName: string;
    placeholder?: string;
    type: string;
    iconSrc?: string;
    inlineSvg?: string;
    options?: string[];
    disabled?: boolean;
  }[];
  dropdownOpen: boolean = false;
  selectedCategory: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  getSanitizedSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  dropdownsOpen: Record<string, boolean> = {};

  toggleDropdown(controlName: string) {
    this.dropdownsOpen[controlName] = !this.dropdownsOpen[controlName];
    this.dropdownOpen = !this.dropdownOpen;
  }

  isDropdownOpen(controlName: string): boolean {
    return this.dropdownsOpen[controlName];
  }

  selectOption(controlName: string, value: string) {
    this.group.get(controlName)?.setValue(value);
    this.dropdownsOpen[controlName] = false;
    this.dropdownOpen = !this.dropdownOpen;
  }
}
