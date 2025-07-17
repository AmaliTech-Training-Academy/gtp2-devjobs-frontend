import { Component } from '@angular/core';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-employer-applications',
  imports: [ EmptyStateComponent, DataTableComponent],
  templateUrl: './employer-applications.component.html',
  styleUrl: './employer-applications.component.scss'
})
export class EmployerApplicationsComponent {
    applications: [] = []
}
