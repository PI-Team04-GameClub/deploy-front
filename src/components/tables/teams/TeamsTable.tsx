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
import { Team } from '../../../types';
import { ActionButtons } from '../../buttons';

interface TeamsTableProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (id: number) => void;
}

const TeamsTable: React.FC<TeamsTableProps> = ({ teams, onEdit, onDelete }) => {
  return (
    <Card>
      <CardBody p={0}>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>ID</Th>
                <Th>Team Name</Th>
                <Th width="180px" textAlign="right">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {teams.map((team) => (
                <Tr key={team.id} _hover={{ bg: 'gray.50' }} transition="all 0.2s">
                  <Td color="gray.600">{team.id}</Td>
                  <Td fontWeight="600">{team.name}</Td>
                  <Td>
                    <ActionButtons
                      onEdit={() => onEdit(team)}
                      onDelete={() => onDelete(team.id)}
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

export default TeamsTable;
