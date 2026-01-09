import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import { tournamentService } from '../../services/tournament_service';
import { Tournament, TournamentFormData } from '../../types';
import { TournamentModal } from '../../components/modals/tournaments/TournamentModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import { TournamentsTable } from '../../components/tables';
import { PageHeader } from '../../components/layouts';

const TournamentsPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<
    Tournament | undefined
  >();
  const [tournamentToDelete, setTournamentToDelete] = useState<number | null>(
    null
  );

  const {
    isOpen: isTournamentModalOpen,
    onOpen: onTournamentModalOpen,
    onClose: onTournamentModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      const data = await tournamentService.getAll();
      setTournaments(data);
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  };

  const handleCreate = () => {
    setSelectedTournament(undefined);
    onTournamentModalOpen();
  };

  const handleEdit = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    onTournamentModalOpen();
  };

  const handleDeleteClick = (id: number) => {
    setTournamentToDelete(id);
    onDeleteDialogOpen();
  };

  const handleSubmit = async (data: TournamentFormData) => {
    try {
      if (selectedTournament) {
        await tournamentService.update(selectedTournament.id, data);
      } else {
        await tournamentService.create(data);
      }
      loadTournaments();
    } catch (error) {
      console.error('Error saving tournament:', error);
    }
  };

  const handleDelete = async () => {
    if (tournamentToDelete) {
      try {
        await tournamentService.delete(tournamentToDelete);
        loadTournaments();
      } catch (error) {
        console.error('Error deleting tournament:', error);
      }
    }
  };

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
        isOpen={isTournamentModalOpen}
        onClose={onTournamentModalClose}
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
