export interface LoginRequest {
  email: string;
  password: string;
}

export interface SeekerRegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface EmployerRegisterRequest {
  fullName?: string;
  username: string;
  companyEmail: string;
  password: string;
  companyName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    tokenType: string;
    refreshToken: string;
    user?: any;
  } | null;
  timestamp: string;
  error: boolean;
  errors: string[] | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'job_seeker' | 'employer';
}

export interface LoginResponse {
  status: 'success' | 'error';
  data: {
    token: string;
    user: User;
  };
}
