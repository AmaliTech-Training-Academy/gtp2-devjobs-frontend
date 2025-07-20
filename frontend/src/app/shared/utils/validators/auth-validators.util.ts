import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AuthValidators {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (
      emailRegex.test(email) &&
      !email.includes('..') &&
      !email.startsWith('.') &&
      !email.endsWith('.')
    );
  }

  static isPersonalEmailDomain(email: string): boolean {
    const personalDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'icloud.com',
      'aol.com',
      'live.com',
      'mail.com',
      'protonmail.com',
      'zoho.com',
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    return personalDomains.includes(domain);
  }

  static isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return (
      usernameRegex.test(username) &&
      username.length >= 3 &&
      username.length <= 20 &&
      !/^[0-9]/.test(username)
    );
  }

  static isStrongPassword(password: string): boolean {
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

  static containsSuspiciousPatterns(text: string): boolean {
    const suspiciousPatterns = [
      /[0-9]{4,}/,
      /[!@#$%^&*(),.?":{}|<>]/,
      /(.)\1{3,}/,
      /^[a-zA-Z]$/,
    ];
    return suspiciousPatterns.some((pattern) => pattern.test(text));
  }

  static capitalizeWords(text: string): string {
    return text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  // Angular Custom Validators
  static strictEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }

      const email = control.value.toString().trim();
      if (!AuthValidators.isValidEmail(email)) {
        return { strictEmail: 'Please enter a valid email address' };
      }

      return null;
    };
  }

  static strictUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }

      const username = control.value.toString().trim();
      if (!AuthValidators.isValidUsername(username)) {
        return {
          strictUsername:
            'Username must be 3-20 characters, contain only letters, numbers, and underscores, and cannot start with a number',
        };
      }

      return null;
    };
  }

  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }

      const password = control.value.toString();
      if (!AuthValidators.isStrongPassword(password)) {
        return {
          strongPassword:
            'Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters',
        };
      }

      return null;
    };
  }

  static noSuspiciousPatterns(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }

      const text = control.value.toString().trim();
      if (AuthValidators.containsSuspiciousPatterns(text)) {
        return {
          suspiciousPatterns:
            'This field contains invalid characters or patterns',
        };
      }

      return null;
    };
  }
}
