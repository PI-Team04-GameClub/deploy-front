import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Heading,
  Text,
  HStack,
  Flex,
  Box,
} from '@chakra-ui/react';
import { NewsItem } from '../../types';
import { ActionButtons } from '../buttons';

interface NewsCardProps {
  news: NewsItem;
  onEdit?: (news: NewsItem) => void;
  onDelete?: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onEdit, onDelete }) => {
  return (
    <Card
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
      transition="all 0.3s"
    >
      <CardBody>
        <Flex justify="space-between" align="start">
          <VStack align="stretch" spacing={3} flex={1}>
            <Heading size="md" fontWeight="700">
              {news.title}
            </Heading>
            <Text color="gray.600" fontSize="sm">
              {news.description}
            </Text>
            <HStack spacing={4} color="gray.500" fontSize="sm">
              <Text>By {news.author}</Text>
              <Text>•</Text>
              <Text>{news.date}</Text>
            </HStack>
          </VStack>
          
          {(onEdit || onDelete) && (
            <Box ml={4}>
              <ActionButtons
                onEdit={onEdit ? () => onEdit(news) : undefined}
                onDelete={onDelete ? () => onDelete(news.id) : undefined}
              />
            </Box>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default NewsCard;
