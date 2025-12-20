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
  HStack,
  Button,
} from '@chakra-ui/react';
import { NewsItem } from '../../../types';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
  news?: NewsItem;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  news,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        description: news.description,
      });
    } else {
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [news, isOpen]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{news ? 'Update News Post' : 'Create News Post'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Title *
              </Text>
              <Input
                placeholder="Enter post title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600" fontSize="sm" color="gray.600">
                Description *
              </Text>
              <Textarea
                placeholder="Enter post description"
                rows={6}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Box>

            <HStack spacing={3} pt={4}>
              <Button variant="ghost" onClick={onClose} flex={1}>
                Cancel
              </Button>
              <Button colorScheme="brand" onClick={handleSubmit} flex={1}>
                {news ? 'Update' : 'Create'}
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
