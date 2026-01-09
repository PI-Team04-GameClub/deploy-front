import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Text,
  Input,
  Select,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Tournament, TournamentFormData, Game } from '../../../types';
import { gameService } from '../../../services/game_service';

interface TournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TournamentFormData) => void;
  tournament?: Tournament;
}

export const TournamentModal: React.FC<TournamentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  tournament,
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [formData, setFormData] = useState<TournamentFormData>({
    name: '',
    gameId: 0,
    players: 0,
    prizePool: 0,
    startDate: '',
  });

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (tournament) {
      const game = games.find((g) => g.name === tournament.game);
      // Extract date part only (YYYY-MM-DD) for the date input
      const dateOnly = tournament.startDate.split('T')[0];
      setFormData({
        name: tournament.name,
        gameId: game?.id || 0,
        players: tournament.players,
        prizePool: tournament.prizePool,
        startDate: dateOnly,
      });
    } else {
      setFormData({
        name: '',
        gameId: 0,
        players: 0,
        prizePool: 0,
        startDate: '',
      });
    }
  }, [tournament, isOpen, games]);

  const loadGames = async () => {
    try {
      const data = await gameService.getAll();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const handleSubmit = () => {
    if (!formData.gameId || formData.gameId === 0) {
      alert('Please select a game');
      return;
    }
    if (!formData.name.trim()) {
      alert('Please enter a tournament name');
      return;
    }
    if (!formData.startDate) {
      alert('Please select a start date');
      return;
    }
    if (formData.prizePool <= 0) {
      alert('Prize pool must be greater than 0');
      return;
    }

    // Convert date to ISO format for backend
    const submitData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
    };

    onSubmit(submitData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>
          {tournament ? 'Update Tournament' : 'Create Tournament'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Tournament Name *
              </Text>
              <Input
                placeholder="Enter tournament name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Game *
              </Text>
              <Select
                placeholder="Select game"
                value={formData.gameId || ''}
                onChange={(e) =>
                  setFormData({ ...formData, gameId: parseInt(e.target.value) })
                }
              >
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Prize Pool *
              </Text>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 1000"
                value={formData.prizePool}
                onChange={(e) =>
                  setFormData({ ...formData, prizePool: parseFloat(e.target.value) || 0 })
                }
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Start Date *
              </Text>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </Box>

            <HStack spacing={3} pt={4}>
              <Button variant="ghost" onClick={onClose} flex={1}>
                Cancel
              </Button>
              <Button colorScheme="brand" onClick={handleSubmit} flex={1}>
                {tournament ? 'Update' : 'Create'}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
