import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Heading,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context';
import { PasswordInput } from '../../components/inputs';
import { SubmitButton } from '../../components/buttons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
  const errorCancelRef = React.useRef(null);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      await login({ email, password });

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/news');
    } catch (error: any) {
      let message = 'Login failed';

      if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }

      setErrorMessage(message);
      onErrorOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Box
        width="full"
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
        p={8}
      >
        <VStack spacing="6">
          <Box textAlign="center">
            <Heading mb="2" fontWeight="800">GameClub</Heading>
            <Text color="gray.600">
              Sign in to your account
            </Text>
          </Box>

          <VStack spacing="4" width="full">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="email"
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="current-password"
            />

            <SubmitButton loading={loading} onClick={handleLogin}>
              Sign In
            </SubmitButton>
          </VStack>

          <HStack justify="center" width="full">
            <Text fontSize="sm" color="gray.600">
              Don't have an account?
            </Text>
            <Button
              as={Link}
              to="/register"
              variant="link"
              colorScheme="brand"
              fontSize="sm"
            >
              Create account
            </Button>
          </HStack>
        </VStack>
      </Box>

      <AlertDialog
        isOpen={isErrorOpen}
        leastDestructiveRef={errorCancelRef}
        onClose={onErrorClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="red.600">
              Error
            </AlertDialogHeader>
            <AlertDialogBody>
              {errorMessage}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onErrorClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default LoginPage;
