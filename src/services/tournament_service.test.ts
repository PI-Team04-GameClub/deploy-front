import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { tournamentService } from './tournament_service';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('tournamentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns tournaments from API', async () => {
      const mockTournaments = [
        { id: 1, name: 'Tournament 1', game: 'Chess', players: 8, prizePool: 1000, startDate: '2024-01-01', status: 'Active' as const },
        { id: 2, name: 'Tournament 2', game: 'Monopoly', players: 4, prizePool: 500, startDate: '2024-02-01', status: 'Upcoming' as const },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockTournaments });

      const result = await tournamentService.getAll();
      
      expect(result).toEqual(mockTournaments);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('returns single tournament from API', async () => {
      const mockTournament = { id: 1, name: 'Tournament 1', game: 'Chess', players: 8, prizePool: 1000, startDate: '2024-01-01', status: 'Active' as const };
      mockedAxios.get.mockResolvedValueOnce({ data: mockTournament });

      const result = await tournamentService.getById(1);
      
      expect(result).toEqual(mockTournament);
    });
  });

  describe('create', () => {
    it('creates tournament via API', async () => {
      const newTournament = { name: 'New Tournament', gameId: 1, players: 16, prizePool: 2000, startDate: '2024-03-01' };
      const createdTournament = { id: 3, name: 'New Tournament', game: 'Chess', players: 16, prizePool: 2000, startDate: '2024-03-01', status: 'Upcoming' as const };
      mockedAxios.post.mockResolvedValueOnce({ data: createdTournament });

      const result = await tournamentService.create(newTournament);
      
      expect(result).toEqual(createdTournament);
    });
  });

  describe('update', () => {
    it('updates tournament via API', async () => {
      const updateData = { name: 'Updated Tournament', gameId: 1, players: 32, prizePool: 5000, startDate: '2024-04-01' };
      const updatedTournament = { id: 1, name: 'Updated Tournament', game: 'Chess', players: 32, prizePool: 5000, startDate: '2024-04-01', status: 'Upcoming' as const };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedTournament });

      const result = await tournamentService.update(1, updateData);
      
      expect(result).toEqual(updatedTournament);
    });
  });

  describe('delete', () => {
    it('deletes tournament via API', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await tournamentService.delete(1);
      
      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
