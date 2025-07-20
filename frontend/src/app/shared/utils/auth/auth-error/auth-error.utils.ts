export class AuthErrorUtils {
  static parseBackendErrors(
    error: any,
    role: 'seeker' | 'employer'
  ): { [key: string]: string } | null {
    const errors: { [key: string]: string } = {};

    const message = error?.error?.message?.toLowerCase() || '';
    const statusCode = error?.status;

    if (error?.error?.errors) {
      const rawErrors = error.error.errors;
      if (Array.isArray(rawErrors)) {
        rawErrors.forEach((err: string) => {
          const [field, msg] = err.split(':').map((s) => s.trim());
          if (field && msg) errors[field] = msg;
        });
      } else if (typeof rawErrors === 'object') {
        Object.entries(rawErrors).forEach(([key, val]) => {
          errors[key] = Array.isArray(val) ? val[0] : val;
        });
      }
    }

    if (error?.error?.details) {
      Object.entries(error.error.details).forEach(([key, val]) => {
        errors[key] = Array.isArray(val) ? val[0] : val;
      });
    }

    switch (statusCode) {
      case 409:
        this.handleConflict(message, errors, role);
        break;
      case 422:
        this.handleValidation(message, errors, role);
        break;
      case 400:
        this.handleBadRequest(message, errors, role);
        break;
      case 429:
        errors['general'] = 'Too many attempts. Please try again later.';
        break;
      case 500:
        errors['general'] = 'Server error occurred. Please try again.';
        break;
      default:
        this.handleGeneric(message, errors, role);
    }

    return Object.keys(errors).length ? errors : null;
  }

  private static handleConflict(msg: string, errors: any, role: string) {
    if (msg.includes('email')) {
      errors[role === 'employer' ? 'companyEmail' : 'email'] =
        'Email already registered';
    }
    if (msg.includes('username')) {
      errors['username'] = 'Username already taken';
    }
    if (msg.includes('company')) {
      errors['companyName'] = 'Company name already registered';
    }
  }

  private static handleValidation(msg: string, errors: any, role: string) {
    if (msg.includes('password')) {
      errors['password'] = 'Weak password. Use a stronger one.';
    }
    if (msg.includes('email')) {
      errors[role === 'employer' ? 'companyEmail' : 'email'] =
        'Invalid email address.';
    }
    if (msg.includes('username')) {
      errors['username'] =
        'Invalid username. Use only letters, numbers, and underscores.';
    }
  }

  private static handleBadRequest(msg: string, errors: any, role: string) {
    if (msg.includes('email') && msg.includes('domain')) {
      errors[role === 'employer' ? 'companyEmail' : 'email'] =
        'Invalid email domain.';
    }
    if (msg.includes('company')) {
      errors['companyEmail'] = 'Use a business email, not personal.';
    }
  }

  private static handleGeneric(msg: string, errors: any, role: string) {
    if (msg.includes('email')) {
      errors[role === 'employer' ? 'companyEmail' : 'email'] =
        'Email already registered';
    }
    if (msg.includes('username')) {
      errors['username'] = 'Username already taken';
    }
    if (msg.includes('company')) {
      errors['companyName'] = 'Company name already registered';
    }
  }
}
