import axios from 'axios';
import { NewsItem, NewsFormData } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const newsService = {
  getAll: async (): Promise<NewsItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
  },

  create: async (data: NewsFormData): Promise<NewsItem> => {
    const response = await axios.post(`${API_BASE_URL}/news`, data);
    return response.data;
  },

  update: async (id: number, data: NewsFormData): Promise<NewsItem> => {
    const response = await axios.put(`${API_BASE_URL}/news/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/news/${id}`);
  },
};
