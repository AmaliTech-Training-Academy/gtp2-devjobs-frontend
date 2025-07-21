export interface AllApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  error: boolean;
  errors: string[] | null;
}
