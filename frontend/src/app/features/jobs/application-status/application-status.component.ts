import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services/job-service/job.service';
import { ApplicationStatus } from '../../../model/application.status';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-application-status',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    PaginatorModule
  ],
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.scss']
})
export class ApplicationStatusComponent implements OnInit {
  applications: ApplicationStatus[] = [];
  selectedFilter: string | null = 'all';
  filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Reviewed', value: 'Reviewed' },
    { label: 'Interviewed', value: 'Interviewed' },
  ];

  filteredApplications: ApplicationStatus[] = [];
  pagedApplications: ApplicationStatus[] = [];
  currentPage: number = 0;
  rowsPerPage: number = 5;

  private jobService = inject(JobService)

  ngOnInit() {
    this.jobService.getApplications().subscribe(data => {
      this.applications = data;
      this.applyFilter();
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
    this.updatePagedApplications();
  }

  updatePagedApplications() {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.pagedApplications = this.filteredApplications.slice(start, end);
  }

  applyFilter() {
    if (!this.selectedFilter || this.selectedFilter === 'all') {
      this.filteredApplications = this.applications;
    } else {
      this.filteredApplications = this.applications.filter(app => app.status === this.selectedFilter);
    }
    this.currentPage = 0; // Reset to first page on filter change
    this.updatePagedApplications();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interviewed': return 'status-interviewed';
      case 'rejected': return 'status-rejected';
      case 'reviewed': return 'status-reviewed';
      default: return '';
    }
  }
}
