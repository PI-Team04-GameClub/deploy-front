import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { useTeams } from '../../hooks';
import { TeamModal } from '../../components/modals/teams/TeamModal';
import { DeleteConfirmDialog } from '../../components/dialogs/DeleteConfirmDialog';
import { TeamsTable } from '../../components/tables';
import { PageHeader } from '../../components/layouts';

const TeamsPage: React.FC = () => {
  const {
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
  } = useTeams();

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
        isOpen={isModalOpen}
        onClose={onModalClose}
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
