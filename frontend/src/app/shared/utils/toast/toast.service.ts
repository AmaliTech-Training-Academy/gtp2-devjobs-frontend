import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastComponent } from '../../components/toast/toast/toast.component';

export interface ToastOptions {
  duration?: number;
  action?: string;
  showCloseButton?: boolean;
  position?: 'top' | 'bottom';
  autoClose?: boolean;
  persistent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private defaultDuration = 5000; // 5 seconds
  private successDuration = 4000; // 4 seconds
  private errorDuration = 8000; // 8 seconds for errors
  private infoDuration = 6000; // 6 seconds for info

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, options?: ToastOptions): void {
    this.showToast(message, 'success', {
      duration: options?.duration || this.successDuration,
      ...options,
    });
  }

  error(message: string, options?: ToastOptions): void {
    this.showToast(message, 'error', {
      duration: options?.duration || this.errorDuration,
      ...options,
    });
  }

  info(message: string, options?: ToastOptions): void {
    this.showToast(message, 'info', {
      duration: options?.duration || this.infoDuration,
      ...options,
    });
  }

  warning(message: string, options?: ToastOptions): void {
    this.showToast(message, 'warning', {
      duration: options?.duration || this.defaultDuration,
      ...options,
    });
  }

  // Specific methods for common use cases
  validationError(message: string): void {
    this.error(message, {
      duration: 6000,
      showCloseButton: true,
    });
  }

  serverError(
    message: string = 'A server error occurred. Please try again later.'
  ): void {
    this.error(message, {
      duration: 10000,
      showCloseButton: true,
      persistent: true,
    });
  }

  networkError(
    message: string = 'Network error. Please check your connection and try again.'
  ): void {
    this.error(message, {
      duration: 8000,
      showCloseButton: true,
    });
  }

  registrationSuccess(userType: 'seeker' | 'employer'): void {
    const message = `${
      userType === 'seeker' ? 'Job seeker' : 'Employer'
    } account created successfully! Please check your email to verify your account.`;
    this.success(message, {
      duration: 8000,
      showCloseButton: true,
    });
  }

  loginSuccess(userName: string): void {
    this.success(`Welcome back, ${userName}!`, {
      duration: 3000,
    });
  }

  duplicateError(field: string, value: string): void {
    const message = `${field} "${value}" is already taken. Please choose a different one.`;
    this.error(message, {
      duration: 6000,
      showCloseButton: true,
    });
  }

  rateLimitError(remainingTime: number): void {
    const message = `Please wait ${remainingTime} seconds before trying again.`;
    this.warning(message, {
      duration: remainingTime * 1000,
    });
  }

  maxAttemptsError(maxAttempts: number): void {
    const message = `Maximum attempts (${maxAttempts}) exceeded. Please try again later or contact support.`;
    this.error(message, {
      duration: 10000,
      showCloseButton: true,
      persistent: true,
    });
  }

  // Method to show persistent toast that doesn't auto-close
  showPersistent(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ): void {
    this.showToast(message, type, {
      duration: 0, // Won't auto-close
      showCloseButton: true,
      persistent: true,
    });
  }

  // Method to show toast with action button
  showWithAction(
    message: string,
    actionText: string,
    actionCallback: () => void,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ): void {
    const config: MatSnackBarConfig = {
      duration: this.defaultDuration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`toast-${type}`],
    };

    const snackBarRef = this.snackBar.open(message, actionText, config);

    snackBarRef.onAction().subscribe(() => {
      actionCallback();
    });
  }

  private showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    options: ToastOptions
  ): void {
    const config: MatSnackBarConfig = {
      duration: options.persistent
        ? 0
        : options.duration || this.defaultDuration,
      horizontalPosition: 'center',
      verticalPosition: options.position === 'bottom' ? 'bottom' : 'top',
      panelClass: [`toast-${type}`],
      data: {
        message,
        type,
        showCloseButton: options.showCloseButton || options.persistent,
      },
    };

    // If persistent or has close button, pass this info to the component via data
    // The ToastComponent should handle showing the close button based on the data.showCloseButton property.

    const snackBarRef = this.snackBar.openFromComponent(ToastComponent, config);

    // Handle close button click
    if (options.showCloseButton || options.persistent) {
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
    }
  }

  // Method to dismiss all toasts
  dismissAll(): void {
    this.snackBar.dismiss();
  }

  // Method to show loading toast
  showLoading(message: string = 'Please wait...'): void {
    this.showToast(message, 'info', {
      duration: 0,
      persistent: true,
    });
  }

  // Method to hide loading toast
  hideLoading(): void {
    this.dismissAll();
  }

  // Method for form validation errors
  showFormErrors(errors: { [key: string]: string }): void {
    const errorMessages = Object.values(errors);
    if (errorMessages.length === 1) {
      this.validationError(errorMessages[0]);
    } else {
      const message = `Please correct the following errors:\n${errorMessages.join(
        '\n'
      )}`;
      this.validationError(message);
    }
  }

  // Method for showing progress updates
  showProgress(message: string, progress: number): void {
    const progressMessage = `${message} (${progress}%)`;
    this.info(progressMessage, { duration: 2000 });
  }

  // Method for showing contextual help
  showHelp(message: string): void {
    this.info(message, {
      duration: 8000,
      showCloseButton: true,
    });
  }

  // Method for showing confirmation messages
  showConfirmation(message: string): void {
    this.success(message, {
      duration: 4000,
    });
  }
}
