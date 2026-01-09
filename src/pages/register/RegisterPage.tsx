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
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context';
import { SuccessAlert, ErrorAlert } from '../../components/alerts';
import { PasswordInput } from '../../components/inputs';
import { SubmitButton } from '../../components/buttons';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const errorCancelRef = React.useRef<HTMLButtonElement>(null);

  const handleRegister = async () => {
    if (!email || !password || !firstName) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      await register({
        first_name: firstName,
        last_name: lastName || '',
        email,
        password,
      });

      onOpen();
    } catch (error: any) {
      let message = 'Registration failed';

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

  const handleDialogClose = () => {
    onClose();
    navigate('/login');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister();
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
              Create a new account
            </Text>
          </Box>

          <VStack spacing="4" width="full">
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="given-name"
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="family-name"
            />
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
              autoComplete="new-password"
            />

            <SubmitButton loading={loading} onClick={handleRegister}>
              Create Account
            </SubmitButton>
          </VStack>

          <HStack justify="center" width="full">
            <Text fontSize="sm" color="gray.600">
              Already have an account?
            </Text>
            <Button
              as={Link}
              to="/login"
              variant="link"
              colorScheme="brand"
              fontSize="sm"
            >
              Sign in
            </Button>
          </HStack>
        </VStack>
      </Box>

      <SuccessAlert
        isOpen={isOpen}
        onClose={handleDialogClose}
        title="Registration Successful"
        message="Your account has been created. Welcome to GameClub!"
        cancelRef={cancelRef}
      />

      <ErrorAlert
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        message={errorMessage}
        cancelRef={errorCancelRef}
      />
    </Container>
  );
};

export default RegisterPage;
