import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => {
  const mockAxiosInstance = {
    post: vi.fn(),
    get: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
  };
});

// Mock localStorage before importing the service
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

// Import after mocking
import { authService } from './auth_service';

// Get the mocked axios instance
const mockAxiosInstance = axios.create() as unknown as {
  post: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
};

describe('authService', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('sends login request and returns auth response', async () => {
      const loginData = { email: 'test@test.com', password: 'password123' };
      const authResponse = { token: 'jwt-token', user: { id: 1, email: 'test@test.com', first_name: 'John', last_name: 'Doe' } };
      mockAxiosInstance.post.mockResolvedValueOnce({ data: authResponse });

      const result = await authService.login(loginData);
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(result).toEqual(authResponse);
    });
  });

  describe('register', () => {
    it('sends register request and returns auth response', async () => {
      const registerData = { email: 'test@test.com', password: 'password123', first_name: 'John', last_name: 'Doe' };
      const authResponse = { token: 'jwt-token', user: { id: 1, email: 'test@test.com', first_name: 'John', last_name: 'Doe' } };
      mockAxiosInstance.post.mockResolvedValueOnce({ data: authResponse });

      const result = await authService.register(registerData);
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/register', registerData);
      expect(result).toEqual(authResponse);
    });
  });

  describe('getCurrentUser', () => {
    it('fetches current user with authorization header', async () => {
      const user = { id: 1, email: 'test@test.com', first_name: 'John', last_name: 'Doe' };
      mockAxiosInstance.get.mockResolvedValueOnce({ data: user });

      const result = await authService.getCurrentUser('my-token');
      
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/auth/me', {
        headers: { Authorization: 'Bearer my-token' },
      });
      expect(result).toEqual(user);
    });
  });

  describe('getToken', () => {
    it('returns null when no token is stored', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      expect(authService.getToken()).toBeNull();
    });

    it('returns token when stored', () => {
      localStorageMock.getItem.mockReturnValueOnce('test-token');
      expect(authService.getToken()).toBe('test-token');
    });
  });

  describe('setToken', () => {
    it('stores token in localStorage', () => {
      authService.setToken('my-token');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'my-token');
    });
  });

  describe('logout', () => {
    it('removes token from localStorage', () => {
      authService.logout();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });

    it('removes user from localStorage', () => {
      authService.logout();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('getUser', () => {
    it('returns null when no user is stored', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      expect(authService.getUser()).toBeNull();
    });

    it('returns parsed user when stored', () => {
      const user = { id: 1, email: 'test@test.com', first_name: 'John', last_name: 'Doe' };
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(user));
      expect(authService.getUser()).toEqual(user);
    });
  });

  describe('setUser', () => {
    it('stores user in localStorage as JSON', () => {
      const user = { id: 1, email: 'test@test.com', first_name: 'John', last_name: 'Doe' };
      authService.setUser(user);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
    });
  });
});
