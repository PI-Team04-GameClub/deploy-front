import axios from 'axios';
import { Team, TeamFormData } from '../types'
import { API_BASE_URL } from '../config';

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
