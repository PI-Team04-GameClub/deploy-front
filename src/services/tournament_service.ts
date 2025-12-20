import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

export const tournamentService = {
  getAll: async (): Promise<Tournament[]> => {
    const response = await axios.get(`${API_BASE_URL}/tournaments`);
    return response.data;
  },

  getById: async (id: number): Promise<Tournament> => {
    const response = await axios.get(`${API_BASE_URL}/tournaments/${id}`);
    return response.data;
  },

  create: async (data: TournamentFormData): Promise<Tournament> => {
    const response = await axios.post(`${API_BASE_URL}/tournaments`, data);
    return response.data;
  },

  update: async (id: number, data: TournamentFormData): Promise<Tournament> => {
    const response = await axios.put(`${API_BASE_URL}/tournaments/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tournaments/${id}`);
  },
};
