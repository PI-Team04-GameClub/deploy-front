import { useState, useEffect, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { gameService } from '../../services/game_service';
import { Game, GameFormData } from '../../types';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();
  const [gameToDelete, setGameToDelete] = useState<number | null>(null);

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

  const loadGames = useCallback(async () => {
    try {
      const data = await gameService.getAll();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const handleCreate = useCallback(() => {
    setSelectedGame(undefined);
    onModalOpen();
  }, [onModalOpen]);

  const handleEdit = useCallback((game: Game) => {
    setSelectedGame(game);
    onModalOpen();
  }, [onModalOpen]);

  const handleDeleteClick = useCallback((id: number) => {
    setGameToDelete(id);
    onDeleteDialogOpen();
  }, [onDeleteDialogOpen]);

  const handleSubmit = useCallback(async (data: GameFormData) => {
    try {
      if (selectedGame) {
        await gameService.update(selectedGame.id, data);
      } else {
        await gameService.create(data);
      }
      loadGames();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  }, [selectedGame, loadGames]);

  const handleDelete = useCallback(async () => {
    if (gameToDelete) {
      try {
        await gameService.delete(gameToDelete);
        loadGames();
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  }, [gameToDelete, loadGames]);

  return {
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
  };
};
