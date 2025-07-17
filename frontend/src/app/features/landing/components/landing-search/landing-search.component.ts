import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../../../../components/search/search.component';

@Component({
  selector: 'app-landing-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SearchComponent,
  ],
  templateUrl: './landing-search.component.html',
  styleUrls: ['./landing-search.component.scss'],
})
export class LandingSearchComponent {
  keywords = '';
  location = '';

  onSearch() {
    if (this.keywords.trim() || this.location.trim()) {
      console.log('Searching for:', this.keywords, 'in', this.location);
    }
  }
}
