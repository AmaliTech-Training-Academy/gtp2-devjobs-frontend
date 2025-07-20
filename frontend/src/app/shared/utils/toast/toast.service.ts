import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 4000): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'success' },
      duration,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string, duration: number = 6000): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'error' },
      duration,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  info(message: string, duration: number = 4000): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'info' },
      duration,
      panelClass: ['toast-info'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
