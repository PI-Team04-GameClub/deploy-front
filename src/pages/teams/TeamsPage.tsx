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
import { teamService } from '../../services/team_service';
import { Team, TeamFormData } from '../../types';
import { TeamModal } from '../../components/modals/teams/TeamModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();
  const [teamToDelete, setTeamToDelete] = useState<number | null>(null);

  const {
    isOpen: isTeamModalOpen,
    onOpen: onTeamModalOpen,
    onClose: onTeamModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await teamService.getAll();
      setTeams(data);
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  };

  const handleCreate = () => {
    setSelectedTeam(undefined);
    onTeamModalOpen();
  };

  const handleEdit = (team: Team) => {
    setSelectedTeam(team);
    onTeamModalOpen();
  };

  const handleDeleteClick = (id: number) => {
    setTeamToDelete(id);
    onDeleteDialogOpen();
  };

  const handleSubmit = async (data: TeamFormData) => {
    try {
      if (selectedTeam) {
        await teamService.update(selectedTeam.id, data);
      } else {
        await teamService.create(data);
      }
      loadTeams();
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  const handleDelete = async () => {
    if (teamToDelete) {
      try {
        await teamService.delete(teamToDelete);
        loadTeams();
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <HStack justify="space-between" mb={6}>
          <Heading size="xl" fontWeight="800">
            Teams
          </Heading>
          <Button
            colorScheme="brand"
            onClick={handleCreate}
          >
            Create Team
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
                <Th>ID</Th>
                <Th>Team Name</Th>
                <Th width="180px" textAlign="right">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {teams.map((team) => (
                <Tr key={team.id} _hover={{ bg: 'gray.50' }}>
                  <Td color="gray.600">{team.id}</Td>
                  <Td fontWeight="600">{team.name}</Td>
                  <Td>
                    <HStack spacing={2} justify="flex-end">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEdit(team)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteClick(team.id)}
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

      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={onTeamModalClose}
        onSubmit={handleSubmit}
        team={selectedTeam}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        onConfirm={handleDelete}
        title="Delete Team"
        message="Are you sure you want to delete this team? This action cannot be undone."
      />
    </Container>
  );
};

export default TeamsPage;
