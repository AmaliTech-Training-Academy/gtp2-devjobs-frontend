import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPublicNavbarComponent } from '../../../../shared/components/auth-public-navbar/auth-public-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-salary-estimate',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AuthPublicNavbarComponent,
    FooterComponent,
  ],
  templateUrl: './salary-estimate.component.html',
  styleUrls: ['./salary-estimate.component.scss'],
})
export class SalaryEstimateComponent {}
