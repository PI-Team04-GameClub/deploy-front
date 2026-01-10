import React from 'react';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useNews } from '../../hooks';
import { NewsModal } from '../../components/modals/news/NewsModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import NewsCard from '../../components/cards/NewsCard';
import { PageHeader } from '../../components/layouts';

const NewsPage: React.FC = () => {
  const {
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
  } = useNews();

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
        isOpen={isModalOpen}
        onClose={onModalClose}
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
