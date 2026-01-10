import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

interface ErrorAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
  buttonText?: string;
  cancelRef: React.RefObject<HTMLButtonElement>;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  isOpen,
  onClose,
  message,
  title = 'Error',
  buttonText = 'OK',
  cancelRef,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="red.600">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" onClick={onClose} ref={cancelRef}>
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ErrorAlert;
