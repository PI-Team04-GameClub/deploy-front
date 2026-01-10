import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { useGames } from '../../hooks';
import { GameModal } from '../../components/modals/games/GameModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import { GamesTable } from '../../components/tables';
import { PageHeader } from '../../components/layouts';

const GamesPage: React.FC = () => {
  const {
    games,
    selectedGame,
    isModalOpen,
    onModalClose,
    isDeleteDialogOpen,
    onDeleteDialogClose,
    handleCreate,
    handleEdit,
    handleDeleteClick,
    handleSubmit,
    handleDelete,
  } = useGames();

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <PageHeader
          title="Games"
          actionLabel="Create Game"
          onAction={handleCreate}
        />

        <GamesTable
          games={games}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </Box>

      <GameModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSubmit={handleSubmit}
        game={selectedGame}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        onConfirm={handleDelete}
        title="Delete Game"
        message="Are you sure you want to delete this game? This action cannot be undone."
      />
    </Container>
  );
};

export default GamesPage;
