import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/utils/toast/toast.service';
import { environment } from '../../../../environments/environment';
import { JwtHelper } from '../../../shared/utils/jwt-helper.util';
import {
  AuthResponse,
  LoginRequest,
  SeekerRegisterRequest,
  EmployerRegisterRequest,
  LoggedInUserResponse,
} from '../../../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private base_Url = environment.apiUrl;
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly userKey = 'user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base_Url}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this.storeTokens(res.data.token, res.data.refreshToken);

            // Extract user info from JWT token and store it
            const userFromToken = this.extractUserFromToken(res.data.token);
            if (userFromToken) {
              this.storeUser(userFromToken);
            }
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  registerSeeker(data: SeekerRegisterRequest): Observable<AuthResponse> {
    const payload = {
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    return this.http
      .post<AuthResponse>(
        `${this.base_Url}/api/v1/auth/register/seeker`,
        payload
      )
      .pipe(
        tap((res) => {
          if (res.success && res.data?.token) {
            this.storeTokens(res.data.token, res.data.refreshToken);
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  registerEmployer(data: EmployerRegisterRequest): Observable<AuthResponse> {
    const payload = {
      username: data.username,
      email: data.companyEmail,
      password: data.password,
      companyName: data.companyName,
    };
    return this.http
      .post<AuthResponse>(
        `${this.base_Url}/api/v1/auth/register/employer`,
        payload
      )
      .pipe(
        tap((res) => {
          if (res.success && res.data?.token) {
            this.storeTokens(res.data.token, res.data.refreshToken);
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    this.toast.success('You have been logged out successfully.');
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return !!token && !JwtHelper.isTokenExpired(token);
  }

  /**
   * Checks if the user is authenticated by calling the backend /api/v1/auth/me endpoint
   * @returns Observable<boolean> - true if authenticated, false otherwise
   */
  checkAuthWithBackend(): Observable<boolean> {
    const token = this.getAccessToken();
    
    if (!token) {
      return new Observable(observer => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.http.get<LoggedInUserResponse>(`${this.base_Url}/api/v1/auth/me`)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            // Update stored user data with fresh data from backend
            this.storeUser({
              id: response.data.profileId,
              email: response.data.email,
              fullName: response.data.fullName,
              profilePhoto: response.data.profilePhoto,
              // Add any other user data you want to store
            });
          }
        }),
        map((response) => response.success && !response.error),
        catchError((error) => {
          console.error('Auth check failed:', error);
          // If the request fails (401, 403, etc.), user is not authenticated
          return new Observable<boolean>(observer => {
            observer.next(false);
            observer.complete();
          });
        })
      );
  }

  /**
   * Quick authentication check that doesn't update user data
   * Use this for simple status checks without side effects
   * @returns Observable<boolean> - true if authenticated, false otherwise
   */
  isAuthenticatedWithBackend(): Observable<boolean> {
    const token = this.getAccessToken();
    
    if (!token) {
      return new Observable(observer => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.http.get<LoggedInUserResponse>(`${this.base_Url}/api/v1/auth/me`)
      .pipe(
        map((response) => response.success && !response.error),
        catchError((error) => {
          console.error('Quick auth check failed:', error);
          return new Observable<boolean>(observer => {
            observer.next(false);
            observer.complete();
          });
        })
      );
  }

  hasRole(role: string): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    const roles = JwtHelper.getRolesFromToken(token);
    return roles.includes(role);
  }

  private extractUserFromToken(token: string): any {
    try {
      const decoded = JwtHelper.decodeToken(token);
      if (!decoded) return null;

      return {
        id: decoded.sub,
        email: decoded.email || decoded.sub,
        roles: JwtHelper.getRolesFromToken(token),
      };
    } catch (error) {
      console.error('Error extracting user from token:', error);
      return null;
    }
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private storeUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error);

    const errorResponse: AuthResponse = {
      success: false,
      message: error.error?.message || 'An error occurred',
      data: null,
      timestamp: new Date().toISOString(),
      error: true,
      errors: error.error?.errors || null,
    };

    return throwError(() => ({ error: errorResponse }));
  }
}
