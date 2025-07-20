import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationStatus } from '../../../model/application.status';
import { environment } from '../../../../environments/environment';

import {
  AllJobsResponse,
  Data,
  Job,
  ApplicationForm,
  ProfileData,
  SeekerProfile,
} from '../../../model/all.jobs';

import { ErrorHandlingService } from '../error-handling/error-handler.service';

interface AllProfileData {
  location: string | null;
  profilePhoto: string | null;
  fullName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_URL_JOB = environment.apiUrl;
  private errorHandler = inject(ErrorHandlingService);
  private BASE_URL_APP = 'assets/application-status.json';
  private selectedJob: Job | null = null;

  private http = inject(HttpClient);

  // In-memory cache for job search results
  private jobsCache: { [key: string]: AllJobsResponse<Data> } = {};

  getJobs(
    page: number = 0,
    size: number = 10,
    salaryMin?: number,
    salaryMax?: number,
    sort?: string,
    title?: string,
    query?: string,
    location?: string
  ): Observable<AllJobsResponse<Data>> {
    // Build query string in required order
    let queryString = '';
    if (title) queryString += `title=${encodeURIComponent(title)}&`;
    if (query) queryString += `query=${encodeURIComponent(query)}&`;
    if (location) queryString += `location=${encodeURIComponent(location)}&`;
    queryString += `page=${page}&size=${size}`;
    if (salaryMin !== undefined) queryString += `&salaryMin=${salaryMin}`;
    if (salaryMax !== undefined) queryString += `&salaryMax=${salaryMax}`;
    if (sort) queryString += `&sort=${encodeURIComponent(sort)}`;

    // Use the query string as the cache key
    const cacheKey = queryString;
    if (this.jobsCache[cacheKey]) {
      return of(this.jobsCache[cacheKey]);
    }

    return this.http
      .get<AllJobsResponse>(`${this.BASE_URL_JOB}/api/v1/jobs?${queryString}`)
      .pipe(
        retry(3),
        catchError((error) => this.errorHandler.handleHttpError(error)),
        tap((result) => {
          this.jobsCache[cacheKey] = result;
        })
      );
  }

  getJobById(id: string): Observable<AllJobsResponse<Job>> {
    return this.http
      .get<AllJobsResponse<Job>>(`${this.BASE_URL_JOB}/api/v1/jobs/${id}`)
      .pipe(
        retry(3),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }

  getJobTitles(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.BASE_URL_JOB}/api/v1/jobs/titles`)
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

  postJobApplication(data: ApplicationForm, id: string) {
    return this.http.post(
      `${this.BASE_URL_JOB}/api/v1/applications/${id}`,
      data
    );
  }

  getProfileDetails(): Observable<AllJobsResponse<ProfileData>> {
    return this.http.get<AllJobsResponse<ProfileData>>(
      `${this.BASE_URL_JOB}/api/v1/auth/me`
    );
  }

  updateProfileDetails(
    data: SeekerProfile | FormData | AllProfileData,
    id: string
  ) {
    return this.http.put(`${this.BASE_URL_JOB}/api/v1/profiles/${id}`, data);
  }
}
