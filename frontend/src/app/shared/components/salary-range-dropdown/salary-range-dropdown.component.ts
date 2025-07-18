import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-salary-range-dropdown',
  imports: [CommonModule, FormsModule, SliderModule],
  templateUrl: './salary-range-dropdown.component.html',
  styleUrls: ['./salary-range-dropdown.component.scss']
})
export class SalaryRangeDropdownComponent {
  @Input() min = 0;
  @Input() max = 900000;
  @Input() step = 1000;
  @Input() value: [number, number] = [30000, 800000];
  @Output() valueChange = new EventEmitter<[number, number]>();

  dropdownOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.dropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  onSliderChange(event: any) {
    this.valueChange.emit(this.value);
  }

  get displayRange() {
    return `$${this.value[0].toLocaleString()} – $${this.value[1].toLocaleString()}`;
  }
} 