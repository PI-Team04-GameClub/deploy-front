import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  size = 'sm',
}) => {
  return (
    <HStack spacing={2} justify="flex-end">
      {onEdit && (
        <Button
          size={size}
          colorScheme="blue"
          variant="ghost"
          onClick={onEdit}
        >
          {editLabel}
        </Button>
      )}
      {onDelete && (
        <Button
          size={size}
          colorScheme="red"
          variant="ghost"
          onClick={onDelete}
        >
          {deleteLabel}
        </Button>
      )}
    </HStack>
  );
};

export default ActionButtons;
