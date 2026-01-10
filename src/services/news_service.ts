import axios from 'axios';
import { NewsItem, NewsFormData } from '../types'
import { API_BASE_URL } from '../config';

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
