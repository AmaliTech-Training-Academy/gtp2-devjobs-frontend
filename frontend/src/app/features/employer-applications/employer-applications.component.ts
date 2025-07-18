
import { Component, OnInit } from '@angular/core';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { DataTableComponent } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'app-employer-applications',
  imports: [ EmptyStateComponent, DataTableComponent],
  templateUrl: './employer-applications.component.html',
  styleUrl: './employer-applications.component.scss'
})

export class EmployerApplicationsComponent implements OnInit {
    applications: any[] = []
    
    activeTab: 'incoming' | 'statuses' = 'incoming';

    secondActiveTab: 'reviewed' | 'interviewed' | 'rejected' = 'reviewed';

    showSecondActiveTab: boolean = false;

    columns: string [] = ["Job Title", "Applicants", "Job Type", "Action"]

    setActive(tab: 'incoming' | 'statuses') {
      this.activeTab = tab;
      this.toggleSecondActiveTab()
      // alert( this.activeTab )
      console.log( this.activeTab )
      
    }


    setSecondActiveTab( tab:'reviewed' | 'interviewed' | 'rejected' ) {
      this.secondActiveTab = tab
      console.log( this.secondActiveTab )
    }

    toggleSecondActiveTab() {
      this.showSecondActiveTab = !this.showSecondActiveTab
    }

    ngOnInit(): void {
      console.log( this.activeTab )
    }



}
