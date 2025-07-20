import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnChanges {
  @Input() searchParams: { title: string; location: string } = { title: '', location: '' };
  @Output() search = new EventEmitter<{ title: string; location: string }>();

  searchForm = new FormGroup({
    title: new FormControl(''),
    location: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchParams'] && changes['searchParams'].currentValue) {
      this.searchForm.patchValue({
        title: this.searchParams.title || '',
        location: this.searchParams.location || ''
      }, { emitEvent: false });
    }
  }

  onSearch() {
    // Emit search parameters to parent, trimming whitespace
    this.search.emit({
      title: (this.searchForm.value.title || '').trim(),
      location: (this.searchForm.value.location || '').trim()
    });
  }
}
