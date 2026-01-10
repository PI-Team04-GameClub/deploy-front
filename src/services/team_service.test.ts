import { describe, it, expect, vi, beforeEach } from 'vitest';
import { teamService } from './team_service';

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

describe('teamService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns teams from API', async () => {
      const mockTeams = [
        { id: 1, name: 'Team A' },
        { id: 2, name: 'Team B' },
      ];
      mockGet.mockResolvedValueOnce({ data: mockTeams });

      const result = await teamService.getAll();
      
      expect(result).toEqual(mockTeams);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });

    it('throws error when API fails', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));

      await expect(teamService.getAll()).rejects.toThrow('Network error');
    });
  });

  describe('getById', () => {
    it('returns single team from API', async () => {
      const mockTeam = { id: 1, name: 'Team A' };
      mockGet.mockResolvedValueOnce({ data: mockTeam });

      const result = await teamService.getById(1);
      
      expect(result).toEqual(mockTeam);
    });
  });

  describe('create', () => {
    it('creates team via API', async () => {
      const newTeam = { name: 'New Team' };
      const createdTeam = { id: 3, name: 'New Team' };
      mockPost.mockResolvedValueOnce({ data: createdTeam });

      const result = await teamService.create(newTeam);
      
      expect(result).toEqual(createdTeam);
      expect(mockPost).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('updates team via API', async () => {
      const updateData = { name: 'Updated Team' };
      const updatedTeam = { id: 1, name: 'Updated Team' };
      mockPut.mockResolvedValueOnce({ data: updatedTeam });

      const result = await teamService.update(1, updateData);
      
      expect(result).toEqual(updatedTeam);
      expect(mockPut).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('deletes team via API', async () => {
      mockDelete.mockResolvedValueOnce({});

      await teamService.delete(1);
      
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
