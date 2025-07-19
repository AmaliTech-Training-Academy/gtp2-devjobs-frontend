import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationStatus } from '../../../model/application.status';
import { environment } from '../../../../environments/environment';
import { AllJobsResponse, Data, Job } from '../../../model/all.jobs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_URL_JOB = environment.apiUrl;
  private BASE_URL_APP = 'assets/application-status.json';
  private http = inject(HttpClient);

  private selectedJob: Job | null = null;

  setSelectedJob(job: Job) {
    this.selectedJob = job;
  }

  getSelectedJob(): Job | null {
    return this.selectedJob;
  }

  getJobs(): Observable<AllJobsResponse<Data>> {
    return this.http.get<AllJobsResponse<Data>>(
      `${this.BASE_URL_JOB}/api/v1/jobs`
    );
  }

  getApplications(): Observable<ApplicationStatus[]> {
    return this.http.get<ApplicationStatus[]>(this.BASE_URL_APP);
  }

  getJobById(id: string): Observable<AllJobsResponse<Job>> {
    return this.http.get<AllJobsResponse<Job>>(
      `${this.BASE_URL_JOB}/api/v1/jobs/${id}`
    );
  }
}
