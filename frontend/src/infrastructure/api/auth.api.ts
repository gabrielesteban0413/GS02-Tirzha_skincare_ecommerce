import { ApiClient } from './base-api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

class AuthApi extends ApiClient {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const client = this.getClient();
    return client.post('/auth/login', payload);
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const client = this.getClient();
    return client.post('/auth/register', payload);
  }

  async logout(): Promise<void> {
    const client = this.getClient();
    await client.post('/auth/logout');
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const client = this.getClient();
    return client.get('/auth/me');
  }
}

export const authApi = new AuthApi();
