import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationStatusResponse } from '../../../model/application.status';
import { catchError, Observable, retry, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorHandlingService } from '../error-handling/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {

private BASE_URL_APP = environment.apiUrl
private http = inject(HttpClient)
private errorHandler = inject(ErrorHandlingService)

// In-memory cache for application status results
private applicationsCache: { [key: string]: ApplicationStatusResponse } = {};

getApplicationStatus(page: number = 0, size: number = 20): Observable<ApplicationStatusResponse> {
  const queryString = `page=${page}&size=${size}`;
  const cacheKey = queryString;
  
  // Check cache first
  if (this.applicationsCache[cacheKey]) {
    return of(this.applicationsCache[cacheKey]);
  }

  return this.http.get<ApplicationStatusResponse>(`${this.BASE_URL_APP}/api/v1/applications/my-applications?${queryString}`).pipe(
    retry(3),
    catchError((error) => this.errorHandler.handleHttpError(error)),
    tap((result) => { 
      this.applicationsCache[cacheKey] = result;
    })
  );
}

// Method to clear cache when needed (e.g., after new application submission)
clearCache(): void {
  this.applicationsCache = {};
}

}
