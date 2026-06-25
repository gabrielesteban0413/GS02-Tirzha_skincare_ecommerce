import axios, { AxiosInstance, AxiosError } from 'axios';

export interface ApiErrorResponse {
  code: string;
  message: string;
  context?: Record<string, any>;
}

export class ApiClient {
  protected client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? '/api' : 'http://localhost:3001/api')) {
    if (!process.env.NEXT_PUBLIC_API_URL && typeof window !== 'undefined') {
      console.warn(
        'NEXT_PUBLIC_API_URL is not defined. The frontend is falling back to /api. Set NEXT_PUBLIC_API_URL in Vercel to your deployed backend URL so products load correctly.'
      );
    }

    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor de respuesta para error handling
    this.client.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError<ApiErrorResponse>) => {
        const apiError = error.response?.data;
        const message = apiError?.message || error.message;
        const code = apiError?.code || 'API_ERROR';
        throw new Error(`[${code}] ${message}`);
      }
    );
  }

  protected getClient(): AxiosInstance {
    return this.client;
  }
}
