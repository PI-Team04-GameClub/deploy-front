import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { newsService } from './news_service';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
      mockedAxios.get.mockResolvedValueOnce({ data: mockNews });

      const result = await newsService.getAll();
      
      expect(result).toEqual(mockNews);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('creates news via API', async () => {
      const newNews = { title: 'New Title', description: 'New Content', authorId: 1 };
      const createdNews = { id: 3, title: 'New Title', description: 'New Content', author: 'John', date: '2024-01-03' };
      mockedAxios.post.mockResolvedValueOnce({ data: createdNews });

      const result = await newsService.create(newNews);
      
      expect(result).toEqual(createdNews);
    });
  });

  describe('update', () => {
    it('updates news via API', async () => {
      const updateData = { title: 'Updated Title', description: 'Updated', authorId: 1 };
      const updatedNews = { id: 1, title: 'Updated Title', description: 'Updated', author: 'John', date: '2024-01-01' };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedNews });

      const result = await newsService.update(1, updateData);
      
      expect(result).toEqual(updatedNews);
    });
  });

  describe('delete', () => {
    it('deletes news via API', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await newsService.delete(1);
      
      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
