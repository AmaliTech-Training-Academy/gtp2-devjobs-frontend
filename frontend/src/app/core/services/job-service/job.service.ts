import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../../model/job';
import { ApplicationStatus } from '../../../model/application.status';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private BASE_URL_JOB = 'assets/jobs.json';
  private BASE_URL_APP = 'assets/application-status.json';
  private http = inject(HttpClient)

getJobs(): Observable<Job[]>{
  return this.http.get<Job[]>(this.BASE_URL_JOB)
}

getApplications(): Observable<ApplicationStatus[]>{
  return this.http.get<ApplicationStatus[]>(this.BASE_URL_APP)
}



}
