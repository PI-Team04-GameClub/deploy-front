import axios from 'axios';

import { Game, GameFormData } from '../types'
import { API_BASE_URL } from '../config';

export const gameService = {
  getAll: async (): Promise<Game[]> => {
    const response = await axios.get(`${API_BASE_URL}/games`);
    return response.data;
  },

  getById: async (id: number): Promise<Game> => {
    const response = await axios.get(`${API_BASE_URL}/games/${id}`);
    return response.data;
  },

  create: async (data: GameFormData): Promise<Game> => {
    const response = await axios.post(`${API_BASE_URL}/games`, data);
    return response.data;
  },

  update: async (id: number, data: GameFormData): Promise<Game> => {
    const response = await axios.put(`${API_BASE_URL}/games/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/games/${id}`);
  },
};
