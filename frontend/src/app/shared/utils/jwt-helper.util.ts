export class JwtHelper {
  /**
   * Decode JWT token payload
   * @param token JWT token string
   * @returns Decoded payload object
   */
  static decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   * @param token JWT token string
   * @returns true if expired, false otherwise
   */
  static isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get user roles from token
   * @param token JWT token string
   * @returns Array of user roles
   */
  static getRolesFromToken(token: string): string[] {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return [];

      // Handle both single role string and array of roles
      if (typeof decoded.roles === 'string') {
        return [decoded.roles];
      }
      return decoded.roles || [];
    } catch (error) {
      console.error('Error extracting roles from token:', error);
      return [];
    }
  }

  /**
   * Get user email from token
   * @param token JWT token string
   * @returns User email
   */
  static getEmailFromToken(token: string): string | null {
    try {
      const decoded = this.decodeToken(token);
      return decoded?.email || decoded?.sub || null;
    } catch (error) {
      return null;
    }
  }
}
