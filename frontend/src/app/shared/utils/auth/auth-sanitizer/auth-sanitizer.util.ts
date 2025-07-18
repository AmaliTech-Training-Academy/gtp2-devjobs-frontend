export class AuthSanitizer {
  static sanitize(formData: any): any {
    const sanitized = { ...formData };

    Object.keys(sanitized).forEach((key) => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitized[key].trim();
      }
    });

    if (sanitized.email) {
      sanitized.email = sanitized.email.toLowerCase();
    }
    if (sanitized.companyEmail) {
      sanitized.companyEmail = sanitized.companyEmail.toLowerCase();
    }
    if (sanitized.fullName) {
      sanitized.fullName = this.capitalize(sanitized.fullName);
    }
    if (sanitized.companyName) {
      sanitized.companyName = this.capitalize(sanitized.companyName);
    }

    return sanitized;
  }

  static capitalize(text: string): string {
    return text.replace(
      /\w\S*/g,
      (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
    );
  }
}
