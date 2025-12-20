import axios from 'axios';
import { Team, TeamFormData } from '../types'

const getApiUrl = (): string => {
  if (typeof window !== 'undefined' && (window as any).API_URL) {
    return (window as any).API_URL;
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:3000/api';
};

const API_BASE_URL = getApiUrl();

export const teamService = {
  getAll: async (): Promise<Team[]> => {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data;
  },

  getById: async (id: number): Promise<Team> => {
    const response = await axios.get(`${API_BASE_URL}/teams/${id}`);
    return response.data;
  },

  create: async (data: TeamFormData): Promise<Team> => {
    const response = await axios.post(`${API_BASE_URL}/teams`, data);
    return response.data;
  },

  update: async (id: number, data: TeamFormData): Promise<Team> => {
    const response = await axios.put(`${API_BASE_URL}/teams/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/teams/${id}`);
  },
};
