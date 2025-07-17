import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-data-table',
  imports: [ TableModule, PaginatorModule, ButtonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() jobsArray: any = []
  @Input() fields: string [] = []

}
