import React from 'react';
import { Box, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { NavLink } from '../links';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={6}
        py={4}
        justify="space-between"
        align="center"
      >
        <Text fontSize="2xl" fontWeight="900" color="brand.500">
          GameClub
        </Text>

        <HStack spacing={8}>
          <HStack spacing={2}>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/tournaments">Tournaments</NavLink>
          </HStack>

          <HStack spacing={4}>
            {user && (
              <>
                <Text fontSize="sm" color="gray.600">
                  {user.first_name} {user.last_name}
                </Text>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
