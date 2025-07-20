import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from './error-handler.service';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlingService],
    });
    service = TestBed.inject(ErrorHandlingService);
    spyOn(window, 'alert').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle 401 error', () => {
    const error = new HttpErrorResponse({
      status: 401,
      error: { message: 'Unauthorized' },
    });
    service.handleHttpError(error).subscribe({
      error: (err) => {
        expect(err.message).toBe('Unauthorized');
        expect(window.alert).toHaveBeenCalledWith('Unauthorized');
      },
    });
  });

  it('should handle 404 error', () => {
    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
    });
    service.handleHttpError(error).subscribe({
      error: (err) => {
        expect(err.message).toBe(
          'Not Found: The requested resource could not be found.'
        );
        expect(window.alert).toHaveBeenCalledWith(
          'Not Found: The requested resource could not be found.'
        );
      },
    });
  });
});
