import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/utils/toast/toast.service';
import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
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
      .post<AuthResponse>(`${this.base_Url}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this.storeTokens(res.data.token, res.data.refreshToken);
            this.toast.success(res.message);
          }
        })
      );
  }

  registerSeeker(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base_Url}/auth/register/seeker`, data)
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this.storeTokens(res.data.token, res.data.refreshToken);
            this.toast.success(res.message);
          }
        })
      );
  }

  registerEmployer(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base_Url}/auth/register/employer`, data)
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this.storeTokens(res.data.token, res.data.refreshToken);
            this.toast.success(res.message);
          }
        })
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
    return !!this.getAccessToken();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role);
  }

  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private storeUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
