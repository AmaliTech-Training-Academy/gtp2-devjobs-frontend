import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    emailRegex.test(email) &&
    !email.includes('..') &&
    !email.startsWith('.') &&
    !email.endsWith('.')
  );
}

export function isStrongPassword(password: string): boolean {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= 8 &&
    hasUppercase &&
    hasLowercase &&
    hasNumbers &&
    hasSpecialChar
  );
}

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return isStrongPassword(value) ? null : { weakPassword: true };
  };
}
export function containsSuspiciousPatterns(text: string): boolean {
  const suspiciousPatterns = [
    /[0-9]{4,}/,
    /[!@#$%^&*(),.?":{}|<>]/,
    /(.)\1{3,}/,
    /^[a-zA-Z]$/,
  ];
  return suspiciousPatterns.some((pattern) => pattern.test(text));
}

export function suspiciousPatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return containsSuspiciousPatterns(value)
      ? { suspiciousPattern: true }
      : null;
  };
}

export function matchPasswordsValidator(
  newKey: string,
  confirmKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const newPassword = group.get(newKey)?.value;
    const confirmPassword = group.get(confirmKey)?.value;

    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  };
}
