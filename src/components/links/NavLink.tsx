import React from 'react';
import { Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <Text
        px={4}
        py={2}
        borderRadius="md"
        fontWeight="600"
        fontSize="sm"
        bg={isActive ? 'brand.500' : 'transparent'}
        color={isActive ? 'white' : 'gray.700'}
        _hover={{
          bg: isActive ? 'brand.600' : 'gray.100',
        }}
        transition="all 0.2s"
      >
        {children}
      </Text>
    </Link>
  );
};

export default NavLink;
