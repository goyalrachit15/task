import React from 'react';
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const username = localStorage.getItem('username');

  const handleLogout = async () => {
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <Flex as="nav" bg="blue.500" color="white" justify="space-between" align="center" p="4">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          <Link to="/">Document Manager</Link>
        </Text>
      </Box>
      <Flex align="center">
        {username ? (
          <>
            <Text mr="4">Hello, {username}</Text>
            <Button colorScheme="teal" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button colorScheme="teal" mr="4">Login</Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="teal">Register</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
