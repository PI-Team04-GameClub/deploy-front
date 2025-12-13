export interface NewsItem {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface NewsFormData {
  title: string;
  description: string;
  authorId: number;
}
