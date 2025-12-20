import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  SimpleGrid,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { newsService } from '../../services/news_service';
import { NewsItem, NewsFormData } from '../../types';
import { NewsModal } from '../../components/modals/news/NewsModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import NewsCard from '../../components/cards/NewsCard';
import { authService } from '../../services/auth_service';

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
      // Ensure data is an array
      if (Array.isArray(data)) {
        setNewsItems(data);
      } else {
        console.error('News data is not an array:', data);
        setNewsItems([]);
      }
    } catch (error) {
      console.error('Error loading news:', error);
      setNewsItems([]);
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
      console.log('Submitting news data:', data);
      const user = authService.getUser();
      console.log('Current user:', user);
      if (!user) {
        console.error('No user logged in');
        alert('You must be logged in to create news');
        return;
      }

      const newsData: NewsFormData = {
        ...data,
        authorId: user.id,
      };
      console.log('News data with authorId:', newsData);

      if (selectedNews) {
        await newsService.update(selectedNews.id, newsData);
      } else {
        await newsService.create(newsData);
      }
      console.log('News saved successfully, reloading');
      loadNews();
    } catch (error) {
      console.error('Error saving news:', error);
      if (error instanceof Error) {
        alert(`Error saving news: ${error.message}`);
      }
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
        <HStack justify="space-between" mb={6}>
          <Heading size="xl" fontWeight="800">
            News & Updates
          </Heading>
          <Button
            colorScheme="brand"
            onClick={handleCreate}
          >
            Create Post
          </Button>
        </HStack>

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
