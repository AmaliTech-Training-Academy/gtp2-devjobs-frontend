import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApplicationStatus } from '../../../model/application.status';
import { environment } from '../../../../environments/environment';
import { AllJobsResponse, JobByIdResponse } from '../../../model/all.jobs';
import { ErrorHandlingService } from '../error-handling/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  private BASE_URL_JOB = environment.apiUrl;
  private errorHandler = inject(ErrorHandlingService);
  private BASE_URL_APP = 'assets/application-status.json';
  private http = inject(HttpClient)

getJobs(page: number = 0, size: number = 10): Observable<AllJobsResponse> {
  return this.http.get<AllJobsResponse>(`${this.BASE_URL_JOB}/api/v1/jobs`, {
    params: { page, size }
  }).pipe(
    retry(3),
    catchError((error) => this.errorHandler.handleHttpError(error))
  );
}

getJob(jobId: string): Observable<JobByIdResponse>{
  return this.http.get<JobByIdResponse>(`${this.BASE_URL_JOB}/api/v1/jobs/${jobId}`).pipe(
    retry(3),
    catchError((error) => this.errorHandler.handleHttpError(error))
  )
}



getApplications(): Observable<ApplicationStatus[]>{
  return this.http.get<ApplicationStatus[]>(this.BASE_URL_APP)
}



}
