import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ApplicationStatusService } from '../../../core/services/application-status/application-status.service';
import { Observable } from 'rxjs';
import { ApplicationStatusResponse, AppliedJob } from '../../../model/application.status';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-application-status',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    PaginationComponent 
  ],
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.scss']
})
export class ApplicationStatusComponent implements OnInit {
  private applicationStatusService = inject(ApplicationStatusService)
  applications$!: Observable<ApplicationStatusResponse>;

  // Holds all applications from the backend
  allApplications: AppliedJob[] = [];
  
  // Holds filtered and searched applications
  filteredApplications: AppliedJob[] = [];
  
  // Search term
  searchTerm: string = '';
  
  selectedFilter: string | null = 'all';
  filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Applied', value: 'APPLIED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Reviewed', value: 'REVIEWED' },
    { label: 'Interviewed', value: 'INTERVIEWED' },
  ];

  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 20; // Default to 20 as requested
  totalElements: number = 0;

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    // Load all applications from backend (page 0, size 20)
    this.applications$ = this.applicationStatusService.getApplicationStatus(0, this.pageSize);
    this.applications$.subscribe((response) => {
      this.allApplications = response.data.content;
      this.totalElements = response.data.totalElements;
      this.totalPages = response.data.totalPages;
      this.pageSize = response.data.size;
      this.applyFilterAndSearch();
      
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilterAndSearch();
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.applyFilterAndSearch();
  }

  applyFilter(): void {
    this.currentPage = 1; // Reset to first page when filtering
    this.applyFilterAndSearch();
  }

  applyFilterAndSearch(): void {
    let filtered = this.allApplications;

    // Apply status filter
    if (this.selectedFilter && this.selectedFilter !== 'all') {
      filtered = filtered.filter(app => 
        app.currentStatus && app.currentStatus.toLowerCase() === this.selectedFilter!.toLowerCase()
      );
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(app => 
        app.company?.companyName?.toLowerCase().includes(searchLower) ||
        app.jobPosting?.title?.toLowerCase().includes(searchLower) ||
        app.currentStatus?.toLowerCase().includes(searchLower) ||
        this.formatDate(app.submittedAt).includes(searchLower)
      );
    }

    // Calculate pagination for filtered results
    const totalFiltered = filtered.length;
    this.totalPages = Math.ceil(totalFiltered / this.pageSize);
    
    // Ensure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }

    // Apply pagination
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredApplications = filtered.slice(start, end);
    
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'applied';
      case 'rejected':
        return 'rejected';
      case 'reviewed':
        return 'reviewed';
      case 'interviewed':
        return 'interviewed';
      default:
        return '';
    }
  }

  // Method to refresh data (useful for clearing cache and reloading)
  refreshData(): void {
    this.applicationStatusService.clearCache();
    this.loadApplications();
  }
}
