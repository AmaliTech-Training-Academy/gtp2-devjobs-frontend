import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/utils/toast/toast.service';
import { environment } from '../../../../environments/environment';
import { JwtHelper } from '../../../shared/utils/jwt-helper.util';
import {
  AuthResponse,
  LoginRequest,
  SeekerRegisterRequest,
  EmployerRegisterRequest,
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
