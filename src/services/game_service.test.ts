import { describe, it, expect, vi, beforeEach } from 'vitest';
import { gameService } from './game_service';

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

describe('gameService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns games from API', async () => {
      const mockGames = [
        { id: 1, name: 'Chess', description: 'Classic game', numberOfPlayers: 2 },
        { id: 2, name: 'Monopoly', description: 'Board game', numberOfPlayers: 4 },
      ];
      mockGet.mockResolvedValueOnce({ data: mockGames });

      const result = await gameService.getAll();
      
      expect(result).toEqual(mockGames);
      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('returns single game from API', async () => {
      const mockGame = { id: 1, name: 'Chess', description: 'Classic', numberOfPlayers: 2 };
      mockGet.mockResolvedValueOnce({ data: mockGame });

      const result = await gameService.getById(1);
      
      expect(result).toEqual(mockGame);
    });
  });

  describe('create', () => {
    it('creates game via API', async () => {
      const newGame = { name: 'New Game', description: 'Fun game', numberOfPlayers: 3 };
      const createdGame = { id: 3, ...newGame };
      mockPost.mockResolvedValueOnce({ data: createdGame });

      const result = await gameService.create(newGame);
      
      expect(result).toEqual(createdGame);
    });
  });

  describe('update', () => {
    it('updates game via API', async () => {
      const updateData = { name: 'Updated Game', description: 'Updated', numberOfPlayers: 5 };
      const updatedGame = { id: 1, ...updateData };
      mockPut.mockResolvedValueOnce({ data: updatedGame });

      const result = await gameService.update(1, updateData);
      
      expect(result).toEqual(updatedGame);
    });
  });

  describe('delete', () => {
    it('deletes game via API', async () => {
      mockDelete.mockResolvedValueOnce({});

      await gameService.delete(1);
      
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
