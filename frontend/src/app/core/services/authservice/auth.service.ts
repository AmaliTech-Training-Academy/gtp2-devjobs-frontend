// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthResponse } from '../../../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  private userRole$ = new BehaviorSubject<'seeker' | 'employer' | null>(null);

  constructor(private router: Router) {}

  login(form: any): Observable<AuthResponse> {
    const mockResponse: AuthResponse = {
      success: true,
      message: 'Success',
      data: {
        token: 'mock-token',
        tokenType: 'Bearer',
        refreshToken: 'mock-refresh-token',
      },
      timestamp: new Date().toISOString(),
      error: false,
      errors: null,
    };

    return of(mockResponse).pipe(
      delay(1000),
      tap((res) => {
        this.storeTokens(res.data!.token, res.data!.refreshToken);
        this.isAuthenticated$.next(true);
        this.userRole$.next(form.userType ?? 'seeker');
      })
    );
  }

  register(form: any): Observable<AuthResponse> {
    return this.login(form);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated$.next(false);
    this.userRole$.next(null);
    this.router.navigate(['/login']);
  }

  storeTokens(token: string, refresh: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  hasToken(): boolean {
    return !!this.getAccessToken();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getUserRole(): Observable<'seeker' | 'employer' | null> {
    return this.userRole$.asObservable();
  }
}
