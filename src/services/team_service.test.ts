import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { teamService } from './team_service';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
      mockedAxios.get.mockResolvedValueOnce({ data: mockTeams });

      const result = await teamService.getAll();
      
      expect(result).toEqual(mockTeams);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('throws error when API fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(teamService.getAll()).rejects.toThrow('Network error');
    });
  });

  describe('getById', () => {
    it('returns single team from API', async () => {
      const mockTeam = { id: 1, name: 'Team A' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockTeam });

      const result = await teamService.getById(1);
      
      expect(result).toEqual(mockTeam);
    });
  });

  describe('create', () => {
    it('creates team via API', async () => {
      const newTeam = { name: 'New Team' };
      const createdTeam = { id: 3, name: 'New Team' };
      mockedAxios.post.mockResolvedValueOnce({ data: createdTeam });

      const result = await teamService.create(newTeam);
      
      expect(result).toEqual(createdTeam);
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('updates team via API', async () => {
      const updateData = { name: 'Updated Team' };
      const updatedTeam = { id: 1, name: 'Updated Team' };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedTeam });

      const result = await teamService.update(1, updateData);
      
      expect(result).toEqual(updatedTeam);
      expect(mockedAxios.put).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('deletes team via API', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await teamService.delete(1);
      
      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
