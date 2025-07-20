import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from './auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/utils/toast/toast.service';
import { AuthResponse } from '../../../model/auth.model';
import { environment } from '../../../../environments/environment';
import { JwtHelper } from '../../../shared/utils/jwt-helper.util';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;
  let router: Router;
  let toastService: jasmine.SpyObj<ToastService>;

  const mockAuthResponse: AuthResponse = {
    success: true,
    message: 'Login successful',
    data: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJqb2Jfc2Vla2VyIl0sImV4cCI6MTk2OTY2ODI1Mn0.SIGNATURE',
      tokenType: 'Bearer',
      refreshToken: 'mock-refresh-token',
      user: null,
    },
    timestamp: new Date().toISOString(),
    error: false,
    errors: null,
  };

  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('ToastService', ['success']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        Auth,
        { provide: ToastService, useValue: toastSpy },
        JwtHelper,
      ],
    });

    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.callFake((key: string) =>
      key === 'access_token' ? mockAuthResponse.data!.token : null
    );
    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(console, 'error').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store tokens and user', () => {
    const email = 'test@example.com';
    const password = 'password';

    service.login(email, password).subscribe({
      next: (response) => {
        expect(response).toEqual(mockAuthResponse);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'access_token',
          mockAuthResponse.data!.token
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'refresh_token',
          'mock-refresh-token'
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'user',
          jasmine.any(String)
        );
        const storedUser = JSON.parse(
          (localStorage.setItem as jasmine.Spy).calls.mostRecent().args[1]
        );
        expect(storedUser).toEqual({
          id: '123',
          email: 'test@example.com',
          roles: ['job_seeker'],
        });
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);
  });

  it('should logout and clear localStorage', () => {
    spyOn(router, 'navigate');
    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(3);
    expect(toastService.success).toHaveBeenCalledWith(
      'You have been logged out successfully.'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should check if user is logged in', () => {
    expect(service.isLoggedIn()).toBeTrue(); 

    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should check if user has role', () => {
    expect(service.hasRole('job_seeker')).toBeTrue();
    expect(service.hasRole('employer')).toBeFalse();

    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.hasRole('job_seeker')).toBeFalse();
  });
});
