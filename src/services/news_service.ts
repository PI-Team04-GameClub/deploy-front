import axios from 'axios';
import { NewsItem, NewsFormData } from '../types'

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

export const newsService = {
  getAll: async (): Promise<NewsItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
  },

  create: async (data: NewsFormData): Promise<NewsItem> => {
    try {
      console.log('API Request: POST', `${API_BASE_URL}/news`, data);
      const response = await axios.post(`${API_BASE_URL}/news`, data);
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

  update: async (id: number, data: NewsFormData): Promise<NewsItem> => {
    try {
      console.log('API Request: PUT', `${API_BASE_URL}/news/${id}`, data);
      const response = await axios.put(`${API_BASE_URL}/news/${id}`, data);
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
    await axios.delete(`${API_BASE_URL}/news/${id}`);
  },
};
