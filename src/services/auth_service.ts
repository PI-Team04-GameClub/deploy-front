import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Configure axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    // Proslijedi error dalje bez dodatnih promjena
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(`/auth/login`, data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(`/auth/register`, data);
    return response.data;
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await axiosInstance.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  setUser: (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};
