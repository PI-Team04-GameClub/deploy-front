import { useState, useEffect, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { newsService } from '../../services/news_service';
import { authService } from '../../services/auth_service';
import { NewsItem, NewsFormData } from '../../types';

export const useNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | undefined>();
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();

  const loadNews = useCallback(async () => {
    try {
      const data = await newsService.getAll();
      setNewsItems(data);
    } catch (error) {
      console.error('Error loading news:', error);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleCreate = useCallback(() => {
    setSelectedNews(undefined);
    onModalOpen();
  }, [onModalOpen]);

  const handleEdit = useCallback((news: NewsItem) => {
    setSelectedNews(news);
    onModalOpen();
  }, [onModalOpen]);

  const handleDeleteClick = useCallback((id: number) => {
    setNewsToDelete(id);
    onDeleteDialogOpen();
  }, [onDeleteDialogOpen]);

  const handleSubmit = useCallback(async (data: Omit<NewsFormData, 'authorId'>) => {
    try {
      const user = authService.getUser();
      if (!user) {
        console.error('No user logged in');
        return;
      }

      const newsData: NewsFormData = {
        ...data,
        authorId: user.id,
      };

      if (selectedNews) {
        await newsService.update(selectedNews.id, newsData);
      } else {
        await newsService.create(newsData);
      }
      loadNews();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  }, [selectedNews, loadNews]);

  const handleDelete = useCallback(async () => {
    if (newsToDelete) {
      try {
        await newsService.delete(newsToDelete);
        loadNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  }, [newsToDelete, loadNews]);

  return {
    newsItems,
    selectedNews,
    isModalOpen,
    onModalClose,
    isDeleteDialogOpen,
    onDeleteDialogClose,
    handleCreate,
    handleEdit,
    handleDeleteClick,
    handleSubmit,
    handleDelete,
  };
};
