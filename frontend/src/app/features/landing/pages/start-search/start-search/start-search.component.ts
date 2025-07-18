import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPublicNavbarComponent } from '../../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
   AuthPublicNavbarComponent,
    FooterComponent,
  ],
  templateUrl: './start-search.component.html',
  styleUrls: ['./start-search.component.scss'],
})
export class StartSearchComponent {}
