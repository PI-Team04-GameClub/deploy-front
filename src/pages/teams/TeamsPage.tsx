import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import { teamService } from '../../services/team_service';
import { Team, TeamFormData } from '../../types';
import { TeamModal } from '../../components/modals/teams/TeamModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import { TeamsTable } from '../../components/tables';
import { PageHeader } from '../../components/layouts';

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
        <PageHeader
          title="Teams"
          actionLabel="Create Team"
          onAction={handleCreate}
        />

        <TeamsTable
          teams={teams}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
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
