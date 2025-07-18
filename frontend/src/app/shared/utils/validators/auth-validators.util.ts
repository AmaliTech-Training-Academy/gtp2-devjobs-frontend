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
}
