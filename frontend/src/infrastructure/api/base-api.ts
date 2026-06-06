import axios, { AxiosInstance, AxiosError } from 'axios';

export interface ApiErrorResponse {
  code: string;
  message: string;
  context?: Record<string, any>;
}

export class ApiClient {
  protected client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api') {
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
