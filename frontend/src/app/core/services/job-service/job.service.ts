import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationStatus } from '../../../model/application.status';
import { environment } from '../../../../environments/environment';
import { AllJobsResponse } from '../../../model/all.jobs';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  private BASE_URL_JOB = environment.apiUrl;
  private BASE_URL_APP = 'assets/application-status.json';
  private http = inject(HttpClient)

getJobs(): Observable<AllJobsResponse>{
  return this.http.get<AllJobsResponse>(`${this.BASE_URL_JOB}/api/v1/jobs`)
}



getApplications(): Observable<ApplicationStatus[]>{
  return this.http.get<ApplicationStatus[]>(this.BASE_URL_APP)
}



}
