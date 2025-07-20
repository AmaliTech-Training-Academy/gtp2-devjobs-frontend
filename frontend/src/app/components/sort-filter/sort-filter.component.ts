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
  sortByControl = new FormControl('salary');
  titleControl = new FormControl('title');
  dateControl = new FormControl('all');

  sortByOptions = [
    { label: 'Salary', value: 'salary' },
    { label: 'Relevance', value: 'relevance' },
    { label: 'Company', value: 'company' }
  ];

  @Input() titleOptions: { label: string, value: string }[] = [];
  @Output() titleChange = new EventEmitter<string>();

  dateOptions = [
    { label: 'All Dates', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Last 2 days', value: 'twoDays' },
    { label: 'Last Week', value: 'lastWeek' },
    { label: 'Last 2 Weeks', value: 'last2Weeks' },
    { label: 'Last Month', value: 'lastMonth' }
  ];

  @Input() salaryRange: [number, number] = [30000, 800000];

  @Output() salaryRangeChange = new EventEmitter<[number, number]>();
  @Output() sortChange = new EventEmitter<string>();

  constructor() {
    this.sortByControl.valueChanges.subscribe((value) => {
      this.sortChange.emit(value ?? undefined);
    });
    this.titleControl.valueChanges.subscribe((value) => {
      this.titleChange.emit(value ?? undefined);
    });
  }

  onSalaryRangeChange(newRange: [number, number]) {
    this.salaryRange = newRange;
    this.salaryRangeChange.emit(newRange);
  }
}
