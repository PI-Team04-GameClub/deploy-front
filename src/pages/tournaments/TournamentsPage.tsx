import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { useTournaments } from '../../hooks';
import { TournamentModal } from '../../components/modals/tournaments/TournamentModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import { TournamentsTable } from '../../components/tables';
import { PageHeader } from '../../components/layouts';

const TournamentsPage: React.FC = () => {
  const {
    tournaments,
    selectedTournament,
    isModalOpen,
    onModalClose,
    isDeleteDialogOpen,
    onDeleteDialogClose,
    handleCreate,
    handleEdit,
    handleDeleteClick,
    handleSubmit,
    handleDelete,
  } = useTournaments();

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <PageHeader
          title="Tournaments"
          actionLabel="Create Tournament"
          onAction={handleCreate}
        />

        <TournamentsTable
          tournaments={tournaments}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </Box>

      <TournamentModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSubmit={handleSubmit}
        tournament={selectedTournament}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        onConfirm={handleDelete}
        title="Delete Tournament"
        message="Are you sure you want to delete this tournament? This action cannot be undone."
      />
    </Container>
  );
};

export default TournamentsPage;
