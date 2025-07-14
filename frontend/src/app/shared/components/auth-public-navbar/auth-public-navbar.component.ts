import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './auth-public-navbar.component.html',
  styleUrls: ['./auth-public-navbar.component.scss'],
})
export class AuthNavbarComponent {}
