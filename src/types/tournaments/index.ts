export interface Tournament {
  id: number;
  name: string;
  game: string;
  players: number;
  prizePool: number;
  startDate: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface TournamentFormData {
  name: string;
  gameId: number;
  players: number;
  prizePool: number;
  startDate: string;
}
