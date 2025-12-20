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
} from '@chakra-ui/react';
import { Match } from '../../types/matches';

interface MatchesTableProps {
  matches: Match[];
}

const MatchesTable: React.FC<MatchesTableProps> = ({ matches }) => {
  return (
    <Card>
      <CardBody p={0}>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Match</Th>
                <Th>Tournament</Th>
                <Th>Game</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {matches.map((match) => (
                <Tr key={match.id} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
                  <Td fontWeight="600">
                    {match.player1} vs {match.player2}
                  </Td>
                  <Td>{match.tournament}</Td>
                  <Td>{match.game}</Td>
                  <Td>{match.date}</Td>
                  <Td>{match.time}</Td>
                  <Td>
                    <Badge colorScheme="orange" px={3} py={1} borderRadius="full">
                      {match.status}
                    </Badge>
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

export default MatchesTable;
