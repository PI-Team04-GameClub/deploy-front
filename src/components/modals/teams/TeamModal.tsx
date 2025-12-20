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
  HStack,
  Button,
} from '@chakra-ui/react';
import { Team, TeamFormData } from '../../../types';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeamFormData) => void;
  team?: Team;
}

export const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  team,
}) => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
  });

  useEffect(() => {
    if (team) {
      setFormData({ name: team.name });
    } else {
      setFormData({ name: '' });
    }
  }, [team, isOpen]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{team ? 'Update Team' : 'Create Team'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Team Name *
              </Text>
              <Input
                placeholder="Enter team name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Box>

            <HStack spacing={3} pt={4}>
              <Button variant="ghost" onClick={onClose} flex={1}>
                Cancel
              </Button>
              <Button colorScheme="brand" onClick={handleSubmit} flex={1}>
                {team ? 'Update' : 'Create'}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
