import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  snackBar = inject(MatSnackBar);

  handle(error: HttpErrorResponse): void {
    let message = 'An unexpected error occurred.';

    if (error.status === 0) {
      message = 'Network error. Please check your connection.';
    } else if (error.status === 404) {
      message = 'Requested resource not found.';
    } else if (error.status === 500) {
      message = 'Server is down.';
    } else if (error.status === 401 || error.status === 403) {
      message = error.error?.error || 'Unauthorized. Please log in again.';
    } else if (typeof error.error === 'string') {
      message = error.error;
    }

    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
