import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { gameService } from './game_service';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
      mockedAxios.get.mockResolvedValueOnce({ data: mockGames });

      const result = await gameService.getAll();
      
      expect(result).toEqual(mockGames);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('returns single game from API', async () => {
      const mockGame = { id: 1, name: 'Chess', description: 'Classic', numberOfPlayers: 2 };
      mockedAxios.get.mockResolvedValueOnce({ data: mockGame });

      const result = await gameService.getById(1);
      
      expect(result).toEqual(mockGame);
    });
  });

  describe('create', () => {
    it('creates game via API', async () => {
      const newGame = { name: 'New Game', description: 'Fun game', numberOfPlayers: 3 };
      const createdGame = { id: 3, ...newGame };
      mockedAxios.post.mockResolvedValueOnce({ data: createdGame });

      const result = await gameService.create(newGame);
      
      expect(result).toEqual(createdGame);
    });
  });

  describe('update', () => {
    it('updates game via API', async () => {
      const updateData = { name: 'Updated Game', description: 'Updated', numberOfPlayers: 5 };
      const updatedGame = { id: 1, ...updateData };
      mockedAxios.put.mockResolvedValueOnce({ data: updatedGame });

      const result = await gameService.update(1, updateData);
      
      expect(result).toEqual(updatedGame);
    });
  });

  describe('delete', () => {
    it('deletes game via API', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await gameService.delete(1);
      
      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
