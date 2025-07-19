import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApplicationStatus } from '../../../model/application.status';
import { environment } from '../../../../environments/environment';

import { AllJobsResponse, Data, Job } from '../../../model/all.jobs';

import { ErrorHandlingService } from '../error-handling/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_URL_JOB = environment.apiUrl;
  private errorHandler = inject(ErrorHandlingService);
  private BASE_URL_APP = 'assets/application-status.json';
  private selectedJob: Job | null = null;

  private http = inject(HttpClient);

  getJobs(
    page: number = 0,
    size: number = 10
  ): Observable<AllJobsResponse<Data>> {
    return this.http
      .get<AllJobsResponse>(`${this.BASE_URL_JOB}/api/v1/jobs`, {
        params: { page, size },
      })
      .pipe(
        retry(3),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  getJobById(id: string): Observable<AllJobsResponse<Job>> {
    return this.http
      .get<JobByIdResponse>(`${this.BASE_URL_JOB}/api/v1/jobs/${id}`)
      .pipe(
        retry(3),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  setSelectedJob(job: Job) {
    this.selectedJob = job;
  }

  getSelectedJob(): Job | null {
    return this.selectedJob;
  }

  getApplications(): Observable<ApplicationStatus[]> {
    return this.http.get<ApplicationStatus[]>(this.BASE_URL_APP);
  }
}
