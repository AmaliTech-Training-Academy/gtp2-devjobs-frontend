import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError, retry } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EmployerApplicationsResponse } from '../../../model/applicationObject';
import { ErrorService } from '../error.service';


import {
  CreatedJobResponse,
  GetEmployerJobsResponse,
  DeleteJobResponse,
  CreateJobPayload,
} from '../../../model/job';
import {
  AllJobsResponse,
  CompanyProfile,
  Skill,
} from '../../../model/all.jobs';

@Injectable({
  providedIn: 'root',
})
export class EmployerHttpRequestsService {
  
  httpClient = inject( HttpClient );
  errorHandler2 = inject(ErrorService);

  constructor() { }


  createNewJob(jobData: CreateJobPayload ): Observable<CreatedJobResponse> {
    return this.httpClient.post<CreatedJobResponse>(`${ environment.apiUrl }/api/v1/jobs`, jobData )
    .pipe(
      catchError((error: any) => {
        this.errorHandler2.handle(error);
        return throwError(() => new Error('Failed to create job. Please try again later.'))
      })
    )
  }


  getAllJobs(): Observable<GetEmployerJobsResponse> {
    return this.httpClient.get<GetEmployerJobsResponse>(`${ environment.apiUrl }/api/v1/employer/jobs`)
    .pipe(
      catchError(( error: any ) => {
        this.errorHandler2.handle(error);
        return throwError(() => new Error('Failed to fetch all jobs. Please try again later'))
      })
    )
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
          this.errorHandler2.handle(error);
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
        this.errorHandler2.handle(error);
          return throwError(
            () => new Error('Failed to update job. Please try again later')
          );
        })
      );
  }

  getJob(jobID: string): Observable<GetEmployerJobsResponse> {
    return this.httpClient.get<GetEmployerJobsResponse>(`${ environment.apiUrl }/api/v1/jobs/${jobID}`)
    .pipe(
      catchError(( error: any ) => {
        this.errorHandler2.handle(error);
        return throwError(() => new Error('Failed to fetch job. Please try again later'))
      })
    )
  }

  getApplications(): Observable<EmployerApplicationsResponse> {
    return this.httpClient.get<EmployerApplicationsResponse>(`${ environment.apiUrl }/api/v1/applications/employer`)
    .pipe(
      catchError(( error: any ) => {
        console.log('Error fetching job ', error ) 
        this.errorHandler2.handle(error);
        return throwError(() => new Error('Failed to fetch job. Please try again later'))
      })
    )
  }

  getProfileDetails(): Observable<AllJobsResponse<CompanyProfile>> {
    return this.httpClient
      .get<AllJobsResponse<CompanyProfile>>(
        `${environment.apiUrl}/api/v1/companies`
      )
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler2.handle(err);
          return throwError(() => err);
        })
      );
  }

  updateProfileDetails(data: FormData, id: string) {
    return this.httpClient
      .put(`${environment.apiUrl}/api/v1/companies/${id}`, data)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler2.handle(err);
          return throwError(() => err);
        })
      );
  }

  getSkills(): Observable<Skill[]> {
    return this.httpClient
      .get<Skill[]>(`${environment.apiUrl}/api/v1/skills`)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler2.handle(err);
          return throwError(() => err);
        })
      );
  }
}
