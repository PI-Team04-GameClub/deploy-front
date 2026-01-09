import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import { gameService } from '../../services/game_service';
import { Game, GameFormData } from '../../types';
import { GameModal } from '../../components/modals/games/GameModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import { GamesTable } from '../../components/tables';
import { PageHeader } from '../../components/layouts';

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();
  const [gameToDelete, setGameToDelete] = useState<number | null>(null);

  const {
    isOpen: isGameModalOpen,
    onOpen: onGameModalOpen,
    onClose: onGameModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const data = await gameService.getAll();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const handleCreate = () => {
    setSelectedGame(undefined);
    onGameModalOpen();
  };

  const handleEdit = (game: Game) => {
    setSelectedGame(game);
    onGameModalOpen();
  };

  const handleDeleteClick = (id: number) => {
    setGameToDelete(id);
    onDeleteDialogOpen();
  };

  const handleSubmit = async (data: GameFormData) => {
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
  };

  const handleDelete = async () => {
    if (gameToDelete) {
      try {
        await gameService.delete(gameToDelete);
        loadGames();
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

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
        isOpen={isGameModalOpen}
        onClose={onGameModalClose}
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
