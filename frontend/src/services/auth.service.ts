import api from './api';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types';

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    const { success, token, user } = response.data;

    if (success && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    const { success, token, user } = response.data;

    if (success && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): any {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export default authService;