import axios from 'axios';

import { Game, GameFormData } from '../types'

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
    try {
      console.log('API Request: POST', `${API_BASE_URL}/games`, data);
      const response = await axios.post(`${API_BASE_URL}/games`, data);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  update: async (id: number, data: GameFormData): Promise<Game> => {
    try {
      console.log('API Request: PUT', `${API_BASE_URL}/games/${id}`, data);
      const response = await axios.put(`${API_BASE_URL}/games/${id}`, data);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      console.log('API Request: DELETE', `${API_BASE_URL}/games/${id}`);
      await axios.delete(`${API_BASE_URL}/games/${id}`);
      console.log('Delete successful');
    } catch (error: any) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
};
