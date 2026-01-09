import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { newsService } from '../../services/news_service';
import { NewsItem, NewsFormData } from '../../types';
import { NewsModal } from '../../components/modals/news/NewsModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import NewsCard from '../../components/cards/NewsCard';
import { authService } from '../../services/auth_service';
import { PageHeader } from '../../components/layouts';

const NewsPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | undefined>();
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);

  const {
    isOpen: isNewsModalOpen,
    onOpen: onNewsModalOpen,
    onClose: onNewsModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await newsService.getAll();
      setNewsItems(data);
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  const handleCreate = () => {
    setSelectedNews(undefined);
    onNewsModalOpen();
  };

  const handleEdit = (news: NewsItem) => {
    setSelectedNews(news);
    onNewsModalOpen();
  };

  const handleDeleteClick = (id: number) => {
    setNewsToDelete(id);
    onDeleteDialogOpen();
  };

  const handleSubmit = async (data: Omit<NewsFormData, 'authorId'>) => {
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
  };

  const handleDelete = async () => {
    if (newsToDelete) {
      try {
        await newsService.delete(newsToDelete);
        loadNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <PageHeader
          title="News & Updates"
          actionLabel="Create Post"
          onAction={handleCreate}
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {newsItems.map((news) => (
            <NewsCard
              key={news.id}
              news={news}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </SimpleGrid>
      </Box>

      <NewsModal
        isOpen={isNewsModalOpen}
        onClose={onNewsModalClose}
        onSubmit={handleSubmit}
        news={selectedNews}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        onConfirm={handleDelete}
        title="Delete News Post"
        message="Are you sure you want to delete this news post? This action cannot be undone."
      />
    </Container>
  );
};

export default NewsPage;
