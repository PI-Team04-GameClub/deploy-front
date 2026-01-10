import { describe, it, expect } from 'vitest';
import { API_BASE_URL } from './config';

describe('config', () => {
  it('should have a defined API_BASE_URL', () => {
    expect(API_BASE_URL).toBeDefined();
  });

  it('should have a string API_BASE_URL', () => {
    expect(typeof API_BASE_URL).toBe('string');
  });

  it('should have a valid URL format or localhost default', () => {
    expect(API_BASE_URL).toMatch(/^https?:\/\/.+|^http:\/\/localhost/);
  });
});
