import { describe, it, expect } from 'vitest';
import type { Tournament, TournamentFormData } from './index';

describe('Tournament types', () => {
  it('should correctly type a Tournament object', () => {
    const tournament: Tournament = {
      id: 1,
      name: 'Championship',
      game: 'Chess',
      players: 16,
      prizePool: 1000,
      startDate: '2024-03-01',
      status: 'Upcoming',
    };

    expect(tournament.id).toBe(1);
    expect(tournament.name).toBe('Championship');
    expect(tournament.status).toBe('Upcoming');
  });

  it('should correctly type TournamentFormData', () => {
    const formData: TournamentFormData = {
      name: 'New Tournament',
      gameId: 1,
      players: 8,
      prizePool: 500,
      startDate: '2024-04-01',
    };

    expect(formData.name).toBe('New Tournament');
    expect(formData.gameId).toBe(1);
  });

  it('should handle all tournament statuses', () => {
    const activeT: Tournament = { id: 1, name: 'T1', game: 'G', players: 8, prizePool: 100, startDate: '2024-01-01', status: 'Active' };
    const upcomingT: Tournament = { id: 2, name: 'T2', game: 'G', players: 8, prizePool: 100, startDate: '2024-01-01', status: 'Upcoming' };
    const completedT: Tournament = { id: 3, name: 'T3', game: 'G', players: 8, prizePool: 100, startDate: '2024-01-01', status: 'Completed' };

    expect(activeT.status).toBe('Active');
    expect(upcomingT.status).toBe('Upcoming');
    expect(completedT.status).toBe('Completed');
  });
});
