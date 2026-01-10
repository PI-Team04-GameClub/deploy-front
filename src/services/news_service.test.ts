import { describe, it, expect, vi, beforeEach } from 'vitest';
import { newsService } from './news_service';

// Create mock functions
const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
    put: (...args: unknown[]) => mockPut(...args),
    delete: (...args: unknown[]) => mockDelete(...args),
  },
}));

describe('newsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns news from API', async () => {
      const mockNews = [
        { id: 1, title: 'News 1', description: 'Content 1', author: 'John', date: '2024-01-01' },
        { id: 2, title: 'News 2', description: 'Content 2', author: 'Jane', date: '2024-01-02' },
      ];
      mockGet.mockResolvedValueOnce({ data: mockNews });

      const result = await newsService.getAll();
      
      expect(result).toEqual(mockNews);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('creates news via API', async () => {
      const newNews = { title: 'New Title', description: 'New Content', authorId: 1 };
      const createdNews = { id: 3, title: 'New Title', description: 'New Content', author: 'John', date: '2024-01-03' };
      mockPost.mockResolvedValueOnce({ data: createdNews });

      const result = await newsService.create(newNews);
      
      expect(result).toEqual(createdNews);
    });
  });

  describe('update', () => {
    it('updates news via API', async () => {
      const updateData = { title: 'Updated Title', description: 'Updated', authorId: 1 };
      const updatedNews = { id: 1, title: 'Updated Title', description: 'Updated', author: 'John', date: '2024-01-01' };
      mockPut.mockResolvedValueOnce({ data: updatedNews });

      const result = await newsService.update(1, updateData);
      
      expect(result).toEqual(updatedNews);
    });
  });

  describe('delete', () => {
    it('deletes news via API', async () => {
      mockDelete.mockResolvedValueOnce({});

      await newsService.delete(1);
      
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
