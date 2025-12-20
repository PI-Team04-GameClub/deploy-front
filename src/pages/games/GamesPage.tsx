import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { gameService } from '../../services/game_service';
import { Game, GameFormData } from '../../types';
import { GameModal } from '../../components/modals/games/GameModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';

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
      console.log('Submitting game data:', data);
      if (selectedGame) {
        console.log('Updating game:', selectedGame.id);
        await gameService.update(selectedGame.id, data);
      } else {
        console.log('Creating new game');
        await gameService.create(data);
      }
      console.log('Game saved successfully, reloading games list');
      await loadGames();
    } catch (error) {
      console.error('Error saving game:', error);
      if (error instanceof Error) {
        alert(`Error saving game: ${error.message}`);
      }
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
        <HStack justify="space-between" mb={6}>
          <Heading size="xl" fontWeight="800">
            Games
          </Heading>
          <Button
            colorScheme="brand"
            onClick={handleCreate}
          >
            Create Game
          </Button>
        </HStack>

        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.100"
        >
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Players</Th>
                <Th width="180px" textAlign="right">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {games.map((game) => (
                <Tr key={game.id} _hover={{ bg: 'gray.50' }}>
                  <Td fontWeight="600">{game.name}</Td>
                  <Td color="gray.600">{game.description}</Td>
                  <Td>{game.numberOfPlayers}</Td>
                  <Td>
                    <HStack spacing={2} justify="flex-end">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEdit(game)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteClick(game.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
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
