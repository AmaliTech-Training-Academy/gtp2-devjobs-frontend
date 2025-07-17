import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/utils/toast/toast.service';

export interface AuthResponse {
  success: boolean;
  message: string;
  data: any;
  timestamp: string;
  error: boolean;
  errors: any;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly userKey = 'user';

  constructor(private router: Router, private toast: ToastService) {}

  // Simulated login
  login(email: string, password: string): Observable<AuthResponse> {
    if (email && password) {
      const user = {
        id: '18b1a568-e19e-4ff0-b3be-fa8a528d47ed',
        username: 'technova_hr',
        email,
        isActive: true,
        roles: ['ROLE_EMPLOYER'],
      };

      const response: AuthResponse = {
        success: true,
        message: 'Success',
        data: {
          token: 'eyJhbGciOiJIUzI1NiJ9.dummy-token-for-access-token.simulated',
          tokenType: 'Bearer',
          refreshToken: 'simulated-refresh-token-uuid',
          user,
        },
        timestamp: new Date().toISOString(),
        error: false,
        errors: null,
      };

      this.storeTokens(response.data.token, response.data.refreshToken);
      this.storeUser(user);

      return of(response);
    }

    return throwError(() => ({
      success: false,
      message: 'Bad credentials',
      data: null,
      timestamp: new Date().toISOString(),
      error: true,
      errors: null,
    }));
  }

  registerSeeker(data: any): Observable<AuthResponse> {
    const user = {
      id: 'seeker-uuid',
      username: data.username,
      email: data.email,
      roles: ['ROLE_SEEKER'],
    };

    const response: AuthResponse = {
      success: true,
      message: 'Success',
      data: {
        token: 'simulated-access-token-for-seeker',
        tokenType: 'Bearer',
        refreshToken: 'simulated-refresh-token-seeker',
        user,
      },
      timestamp: new Date().toISOString(),
      error: false,
      errors: null,
    };

    this.storeTokens(response.data.token, response.data.refreshToken);
    this.storeUser(user);

    return of(response);
  }

  registerEmployer(data: any): Observable<AuthResponse> {
    const user = {
      id: 'employer-uuid',
      username: data.username,
      email: data.companyEmail,
      roles: ['ROLE_EMPLOYER'],
    };

    const response: AuthResponse = {
      success: true,
      message: 'Success',
      data: {
        token: 'simulated-access-token-for-employer',
        tokenType: 'Bearer',
        refreshToken: 'simulated-refresh-token-employer',
        user,
      },
      timestamp: new Date().toISOString(),
      error: false,
      errors: null,
    };

    this.storeTokens(response.data.token, response.data.refreshToken);
    this.storeUser(user);

    return of(response);
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
