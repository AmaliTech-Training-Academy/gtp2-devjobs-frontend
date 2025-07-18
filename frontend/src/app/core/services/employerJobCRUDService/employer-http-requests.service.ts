import { Injectable, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { 
        // EmployerJob, 
        CreatedJobResponse, 
        GetEmployerJobsResponse, 
        UpdatedJobResponse,
        DeleteJobResponse,
        CreateJobPayload,
        UpdateJobPayload
      } from '../../../model/job';

@Injectable({
  providedIn: 'root'
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


  baseUrl = 'https://f20c1106ab65.ngrok-free.app/'

  
  httpClient = inject( HttpClient )

  constructor() { }


  createNewJob(jobData: CreateJobPayload ): Observable<CreatedJobResponse> {
    return this.httpClient.post<CreatedJobResponse>(`${ this.baseUrl }`, jobData )
    .pipe(
      catchError((error: any) => {
        console.error('Job creation failed:', error);
        return throwError(() => new Error('Failed to create job. Please try again later.'))
      })
    )
  }



  getAllJobs(): Observable<GetEmployerJobsResponse> {
    return this.httpClient.get<GetEmployerJobsResponse>('https://f20c1106ab65.ngrok-free.app/api/v1/jobs')
    .pipe(
      catchError(( error: any ) => {
        console.log('Error fetching all jobs ', error ) 
        return throwError(() => new Error('Failed to fetch all jobs. Please try again later'))
      })
    )
  }


  updateJob(jobID: string, jobData: UpdateJobPayload): Observable<UpdatedJobResponse> {
    return this.httpClient.put<UpdatedJobResponse>(`${this.baseUrl}${jobID}`, jobData)
    .pipe(
      catchError(( error: any ) => {
        console.log('Error updating job ', error ) 
        return throwError(() => new Error('Failed to update job. Please try again later'))
      })
    )
  }


  deleteJob(jobID: string): Observable<DeleteJobResponse> {
    return this.httpClient.delete<DeleteJobResponse>(`${this.baseUrl}${jobID}`)
    .pipe(
      catchError(( error: any ) => {
        console.log('Error updating job ', error ) 
        return throwError(() => new Error('Failed to update job. Please try again later'))
      })
    )
  }


  getJob(jobID: string): Observable<GetEmployerJobsResponse> {
    return this.httpClient.get<GetEmployerJobsResponse>(`${this.baseUrl}${jobID}`)
    .pipe(
      catchError(( error: any ) => {
        console.log('Error fetching job ', error ) 
        return throwError(() => new Error('Failed to fetch job. Please try again later'))
      })
    )
  }


}
