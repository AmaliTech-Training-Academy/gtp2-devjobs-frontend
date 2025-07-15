import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-sort-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectModule],
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

  titleOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Position', value: 'position' }
  ];

  dateOptions = [
    { label: 'All Dates', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' }
  ];
}
