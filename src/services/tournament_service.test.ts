import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tournamentService } from './tournament_service';

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
      mockGet.mockResolvedValueOnce({ data: mockTournaments });

      const result = await tournamentService.getAll();
      
      expect(result).toEqual(mockTournaments);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('returns single tournament from API', async () => {
      const mockTournament = { id: 1, name: 'Tournament 1', game: 'Chess', players: 8, prizePool: 1000, startDate: '2024-01-01', status: 'Active' as const };
      mockGet.mockResolvedValueOnce({ data: mockTournament });

      const result = await tournamentService.getById(1);
      
      expect(result).toEqual(mockTournament);
    });
  });

  describe('create', () => {
    it('creates tournament via API', async () => {
      const newTournament = { name: 'New Tournament', gameId: 1, players: 16, prizePool: 2000, startDate: '2024-03-01' };
      const createdTournament = { id: 3, name: 'New Tournament', game: 'Chess', players: 16, prizePool: 2000, startDate: '2024-03-01', status: 'Upcoming' as const };
      mockPost.mockResolvedValueOnce({ data: createdTournament });

      const result = await tournamentService.create(newTournament);
      
      expect(result).toEqual(createdTournament);
    });
  });

  describe('update', () => {
    it('updates tournament via API', async () => {
      const updateData = { name: 'Updated Tournament', gameId: 1, players: 32, prizePool: 5000, startDate: '2024-04-01' };
      const updatedTournament = { id: 1, name: 'Updated Tournament', game: 'Chess', players: 32, prizePool: 5000, startDate: '2024-04-01', status: 'Upcoming' as const };
      mockPut.mockResolvedValueOnce({ data: updatedTournament });

      const result = await tournamentService.update(1, updateData);
      
      expect(result).toEqual(updatedTournament);
    });
  });

  describe('delete', () => {
    it('deletes tournament via API', async () => {
      mockDelete.mockResolvedValueOnce({});

      await tournamentService.delete(1);
      
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
