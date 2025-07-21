import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SalaryRangeDropdownComponent } from '../../shared/components/salary-range-dropdown/salary-range-dropdown.component';

@Component({
  selector: 'app-sort-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectModule, SalaryRangeDropdownComponent],
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss']
})
export class SortFilterComponent {
  sortControl = new FormControl('salary,desc');
  titleControl = new FormControl('title');
  dateControl = new FormControl('all');

  sortOptions = [
    {
      label: 'Salary',
      items: [
        { label: 'Ascending', value: 'salary,asc' },
        { label: 'Descending', value: 'salary,desc' }
      ]
    },
    {
      label: 'Title',
      items: [
        { label: 'A-Z', value: 'title,asc' },
        { label: 'Z-A', value: 'title,desc' }
      ]
    }
  ];

  @Input() titleOptions: { label: string, value: string }[] = [];
  @Output() titleChange = new EventEmitter<string>();

  dateOptions = [
    { label: 'Today', value: 'TODAY' },
    { label: 'Last 2 Days', value: 'LAST_2_DAYS' },
    { label: 'Last Week', value: 'LAST_WEEK' },
    { label: 'Last 2 Weeks', value: 'LAST_2_WEEKS' },
    { label: 'Last Month', value: 'LAST_MONTH' },
    { label: 'All Dates', value: 'ALL_DATES' }
  ];

  @Output() dateChange = new EventEmitter<string>();

  @Input() salaryRange: [number, number] = [30000, 800000];

  @Output() salaryRangeChange = new EventEmitter<[number, number]>();
  @Output() sortChange = new EventEmitter<string>();

  constructor() {
    this.sortControl.valueChanges.subscribe((value) => {
      this.sortChange.emit(value ?? undefined);
    });
    this.titleControl.valueChanges.subscribe((value) => {
      this.titleChange.emit(value ?? undefined);
    });
    this.dateControl.valueChanges.subscribe((value) => {
      this.dateChange.emit(value ?? undefined);
    });
  }

  onSalaryRangeChange(newRange: [number, number]) {
    this.salaryRange = newRange;
    this.salaryRangeChange.emit(newRange);
  }
}
