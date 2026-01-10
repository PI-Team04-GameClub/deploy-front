import { useState, useEffect, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { teamService } from '../../services/team_service';
import { Team, TeamFormData } from '../../types';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();
  const [teamToDelete, setTeamToDelete] = useState<number | null>(null);

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

  const loadTeams = useCallback(async () => {
    try {
      const data = await teamService.getAll();
      setTeams(data);
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const handleCreate = useCallback(() => {
    setSelectedTeam(undefined);
    onModalOpen();
  }, [onModalOpen]);

  const handleEdit = useCallback((team: Team) => {
    setSelectedTeam(team);
    onModalOpen();
  }, [onModalOpen]);

  const handleDeleteClick = useCallback((id: number) => {
    setTeamToDelete(id);
    onDeleteDialogOpen();
  }, [onDeleteDialogOpen]);

  const handleSubmit = useCallback(async (data: TeamFormData) => {
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
  }, [selectedTeam, loadTeams]);

  const handleDelete = useCallback(async () => {
    if (teamToDelete) {
      try {
        await teamService.delete(teamToDelete);
        loadTeams();
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  }, [teamToDelete, loadTeams]);

  return {
    teams,
    selectedTeam,
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
