import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card'


@Component({
  selector: 'app-stats-card',
  imports: [ CardModule ],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent {
  @Input() title = 'Total jobs';
  @Input() count = 50;
  @Input() change = '+20 This month';
  @Input() today = '+2 Today';
  @Input() icon = 'pi-briefcase';

}
