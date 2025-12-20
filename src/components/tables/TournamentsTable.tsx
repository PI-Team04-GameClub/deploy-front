import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Tournament } from '../../types/tournaments';

interface TournamentsTableProps {
  tournaments: Tournament[];
  onEdit: (tournament: Tournament) => void;
  onDelete: (id: number) => void;
}

const TournamentsTable: React.FC<TournamentsTableProps> = ({ 
  tournaments, 
  onEdit, 
  onDelete 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Upcoming': return 'blue';
      case 'Completed': return 'gray';
      default: return 'orange';
    }
  };

  return (
    <Card>
      <CardBody p={0}>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Name</Th>
                <Th>Game</Th>
                <Th>Prize Pool</Th>
                <Th>Start Date</Th>
                <Th>Status</Th>
                <Th width="180px" textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tournaments.map((tournament) => (
                <Tr key={tournament.id} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
                  <Td fontWeight="600">{tournament.name}</Td>
                  <Td>{tournament.game}</Td>
                  <Td fontWeight="600" color="green.600">
                    {tournament.prizePool}
                  </Td>
                  <Td>{tournament.startDate.split('T')[0]}</Td>
                  <Td>
                    <Badge
                      colorScheme={getStatusColor(tournament.status)}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {tournament.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2} justify="flex-end">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => onEdit(tournament)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => onDelete(tournament.id)}
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
      </CardBody>
    </Card>
  );
};

export default TournamentsTable;
