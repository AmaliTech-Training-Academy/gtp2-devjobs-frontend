import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import {
  // EmployerJob,
  CreatedJobResponse,
  GetEmployerJobsResponse,
  UpdatedJobResponse,
  DeleteJobResponse,
  CreateJobPayload,
  UpdateJobPayload,
} from '../../../model/job';
import { AllJobsResponse, CompanyProfile } from '../../../model/all.jobs';

@Injectable({
  providedIn: 'root',
})
export class EmployerHttpRequestsService {
  // create job: Post: /api/v1/jobs
  // get job: GET /api/v1/jobs/employer
  /*update a job posting:
    PUT /api/v1/jobs/{id}
    
    delete a job posting:
    DELETE /api/v1/jobs/{id}
    
    get job posting details:
    GET /api/v1/jobs/{id}*/

  // baseUrl = environment.apiUrl

  httpClient = inject(HttpClient);

  constructor() {}

  createNewJob(jobData: CreateJobPayload): Observable<CreatedJobResponse> {
    return this.httpClient
      .post<CreatedJobResponse>(`${environment.apiUrl}/api/v1/jobs`, jobData)
      .pipe(
        catchError((error: any) => {
          console.error('Job creation failed:', error);
          return throwError(
            () => new Error('Failed to create job. Please try again later.')
          );
        })
      );
  }

  getAllJobs(): Observable<GetEmployerJobsResponse> {
    return this.httpClient
      .get<GetEmployerJobsResponse>(
        `${environment.apiUrl}/api/v1/jobs/employer`
      )
      .pipe(
        catchError((error: any) => {
          console.log('Error fetching all jobs ', error);
          return throwError(
            () => new Error('Failed to fetch all jobs. Please try again later')
          );
        })
      );
  }

  updateJob(
    jobID: string,
    jobData: CreateJobPayload
  ): Observable<CreatedJobResponse> {
    return this.httpClient
      .put<CreatedJobResponse>(
        `${environment.apiUrl}/api/v1/jobs/${jobID}`,
        jobData
      )
      .pipe(
        catchError((error: any) => {
          console.log('Error updating job ', error);
          return throwError(
            () => new Error('Failed to update job. Please try again later')
          );
        })
      );
  }

  deleteJob(jobID: string): Observable<DeleteJobResponse> {
    return this.httpClient
      .delete<DeleteJobResponse>(`${environment.apiUrl}/api/v1/jobs/${jobID}`)
      .pipe(
        catchError((error: any) => {
          console.log('Error updating job ', error);
          return throwError(
            () => new Error('Failed to update job. Please try again later')
          );
        })
      );
  }

  getJob(jobID: string): Observable<GetEmployerJobsResponse> {
    return this.httpClient
      .get<GetEmployerJobsResponse>(
        `${environment.apiUrl}/api/v1/jobs/${jobID}`
      )
      .pipe(
        catchError((error: any) => {
          console.log('Error fetching job ', error);
          return throwError(
            () => new Error('Failed to fetch job. Please try again later')
          );
        })
      );
  }

  getApplications() {}

  getProfileDetails(): Observable<AllJobsResponse<CompanyProfile>> {
    return this.httpClient.get<AllJobsResponse<CompanyProfile>>(
      `${environment.apiUrl}/api/v1/companies`
    );
  }

  updateProfileDetails(data: FormData, id: string) {
    return this.httpClient.put(
      `${environment.apiUrl}/api/v1/companies/${id}`,
      data
    );
  }
}
