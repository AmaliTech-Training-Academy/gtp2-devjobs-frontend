import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  @Input() header: string = 'No jobs posted yet';
  @Input() subHeader: string =
    'Click on create a job button to start creating jobs';
}
