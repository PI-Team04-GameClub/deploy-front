import { useState, useEffect, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { tournamentService } from '../../services/tournament_service';
import { Tournament, TournamentFormData } from '../../types';

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | undefined>();
  const [tournamentToDelete, setTournamentToDelete] = useState<number | null>(null);

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

  const loadTournaments = useCallback(async () => {
    try {
      const data = await tournamentService.getAll();
      setTournaments(data);
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  }, []);

  useEffect(() => {
    loadTournaments();
  }, [loadTournaments]);

  const handleCreate = useCallback(() => {
    setSelectedTournament(undefined);
    onModalOpen();
  }, [onModalOpen]);

  const handleEdit = useCallback((tournament: Tournament) => {
    setSelectedTournament(tournament);
    onModalOpen();
  }, [onModalOpen]);

  const handleDeleteClick = useCallback((id: number) => {
    setTournamentToDelete(id);
    onDeleteDialogOpen();
  }, [onDeleteDialogOpen]);

  const handleSubmit = useCallback(async (data: TournamentFormData) => {
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
  }, [selectedTournament, loadTournaments]);

  const handleDelete = useCallback(async () => {
    if (tournamentToDelete) {
      try {
        await tournamentService.delete(tournamentToDelete);
        loadTournaments();
      } catch (error) {
        console.error('Error deleting tournament:', error);
      }
    }
  }, [tournamentToDelete, loadTournaments]);

  return {
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
  };
};
