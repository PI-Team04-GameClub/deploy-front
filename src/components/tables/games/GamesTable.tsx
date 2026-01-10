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
} from '@chakra-ui/react';
import { Game } from '../../../types';
import { ActionButtons } from '../../buttons';

interface GamesTableProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
}

const GamesTable: React.FC<GamesTableProps> = ({ games, onEdit, onDelete }) => {
  return (
    <Card>
      <CardBody p={0}>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Players</Th>
                <Th width="180px" textAlign="right">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {games.map((game) => (
                <Tr key={game.id} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
                  <Td fontWeight="600">{game.name}</Td>
                  <Td color="gray.600">{game.description}</Td>
                  <Td>{game.numberOfPlayers}</Td>
                  <Td>
                    <ActionButtons
                      onEdit={() => onEdit(game)}
                      onDelete={() => onDelete(game.id)}
                    />
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

export default GamesTable;
