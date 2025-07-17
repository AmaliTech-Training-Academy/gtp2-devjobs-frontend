import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration = 3000): void {
    this.openToast(message, 'success', duration);
  }

  error(message: string, duration = 3000): void {
    this.openToast(message, 'error', duration);
  }

  info(message: string, duration = 3000): void {
    this.openToast(message, 'info', duration);
  }

  private openToast(
    message: string,
    type: 'success' | 'error' | 'info',
    duration: number
  ): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`toast-${type}`],
    });
  }
}
