import axios from 'axios';
import { Tournament, TournamentFormData } from '../types';
import { API_BASE_URL } from '../config';

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
