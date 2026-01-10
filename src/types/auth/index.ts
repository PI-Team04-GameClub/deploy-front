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
