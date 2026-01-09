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
  Textarea,
  NumberInput,
  NumberInputField,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Game, GameFormData } from '../../../types';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GameFormData) => void;
  game?: Game;
}

export const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  game,
}) => {
  const [formData, setFormData] = useState<GameFormData>({
    name: '',
    description: '',
    numberOfPlayers: 2,
  });

  useEffect(() => {
    if (game) {
      setFormData({
        name: game.name,
        description: game.description,
        numberOfPlayers: game.numberOfPlayers,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        numberOfPlayers: 2,
      });
    }
  }, [game, isOpen]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{game ? 'Update Game' : 'Create Game'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Game Name *
              </Text>
              <Input
                placeholder="Enter game name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Description *
              </Text>
              <Textarea
                placeholder="Enter game description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Number of Players *
              </Text>
              <NumberInput
                min={2}
                max={10}
                value={formData.numberOfPlayers}
                onChange={(_, val) =>
                  setFormData({ ...formData, numberOfPlayers: val })
                }
              >
                <NumberInputField placeholder="Enter number of players" />
              </NumberInput>
            </Box>

            <HStack spacing={3} pt={4}>
              <Button variant="ghost" onClick={onClose} flex={1}>
                Cancel
              </Button>
              <Button colorScheme="brand" onClick={handleSubmit} flex={1}>
                {game ? 'Update' : 'Create'}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
