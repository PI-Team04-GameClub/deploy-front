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
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import {  tournamentService } from '../../services/tournament_service';
import { Tournament, TournamentFormData } from '../../types';
import { TournamentModal } from '../../components/modals/tournaments/TournamentModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Upcoming':
        return 'blue';
      case 'Completed':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <HStack justify="space-between" mb={6}>
          <Heading size="xl" fontWeight="800">
            Tournaments
          </Heading>
          <Button
            colorScheme="brand"
            onClick={handleCreate}
          >
            Create Tournament
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
        <Th>Game</Th>
        <Th>Prize Pool</Th>
        <Th>Start Date</Th>
        <Th>Status</Th>
        <Th width="180px" textAlign="right">
        Actions
        </Th>
        </Tr>
        </Thead>
        <Tbody>
        {tournaments.map((tournament) => (
            <Tr key={tournament.id} _hover={{ bg: 'gray.50' }}>
            <Td fontWeight="600">{tournament.name}</Td>
            <Td color="gray.600">{tournament.game}</Td>
            <Td fontWeight="600" color="green.600">
            ${tournament.prizePool.toFixed(2)}
            </Td>
            <Td>{tournament.startDate}</Td>
            <Td>
            <Badge colorScheme={getStatusColor(tournament.status)}>
            {tournament.status}
            </Badge>
            </Td>
            <Td>
            <HStack spacing={2} justify="flex-end">
            <Button
            size="sm"
            colorScheme="blue"
            variant="ghost"
            onClick={() => handleEdit(tournament)}
            >
            Edit
            </Button>
            <Button
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => handleDeleteClick(tournament.id)}
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
