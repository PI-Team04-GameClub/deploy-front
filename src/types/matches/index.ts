export interface Match {
  id: number;
  tournament: string;
  game: string;
  player1: string;
  player2: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  winner?: string;
}
