import { describe, it, expect } from 'vitest';
import type { Game, GameFormData } from './index';

describe('Game types', () => {
  it('should correctly type a Game object', () => {
    const game: Game = {
      id: 1,
      name: 'Chess',
      description: 'Classic strategy game',
      numberOfPlayers: 2,
    };

    expect(game.id).toBe(1);
    expect(game.name).toBe('Chess');
    expect(game.description).toBe('Classic strategy game');
    expect(game.numberOfPlayers).toBe(2);
  });

  it('should correctly type GameFormData', () => {
    const formData: GameFormData = {
      name: 'New Game',
      description: 'A fun game',
      numberOfPlayers: 4,
    };

    expect(formData.name).toBe('New Game');
    expect(formData.numberOfPlayers).toBe(4);
  });
});
