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
  InputGroup,
  InputRightElement,
  Icon,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth_service';

const LoginPage: React.FC = () => {
  console.log('✅ LoginPage komponenta učitana - verzija s debug logiranjem');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const errorCancelRef = React.useRef(null);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Greška',
        description: 'Molimo popunite sva polja',
        status: 'error',
        duration: 3,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    console.log('=== LOGIN START ===');
    console.log('Pokušavam login s:', { email, password: '***' });
    
    try {
      const response = await authService.login({ email, password });
      
      console.log('✅ Login response:', response);
      
      authService.setToken(response.token);
      authService.setUser({
        id: response.id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
      });

      // Dispatch event to notify App.tsx of auth change
      window.dispatchEvent(new StorageEvent('storage', { key: 'token' }));

      toast({
        title: 'Uspješan login',
        status: 'success',
        duration: 3,
        isClosable: true,
      });

      console.log('Navigating to /news');
      navigate('/news');
    } catch (error: any) {
      console.error('Login error object:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      
      let message = 'Greška pri logiranju';
      
      if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      
      console.log('Prikazujem error:', message);
      setErrorMessage(message);
      onErrorOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !firstName) {
      toast({
        title: 'Greška',
        description: 'Molimo popunite sva polja',
        status: 'error',
        duration: 3,
        isClosable: true,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Greška',
        description: 'Lozinka mora biti najmanje 6 karaktera',
        status: 'error',
        duration: 3,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Registering with:', { email, firstName, lastName });
      const response = await authService.register({
        first_name: firstName,
        last_name: lastName || '',
        email,
        password,
      });

      console.log('Register response:', response);

      // Show success dialog WITHOUT logging in
      onOpen();
    } catch (error: any) {
      console.error('Register error object:', error);
      console.error('Register error response:', error.response);
      console.error('Register error data:', error.response?.data);
      
      let message = 'Greška pri registraciji';
      
      if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      
      console.log('Prikazujem register error:', message);
      setErrorMessage(message);
      onErrorOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    onClose();
    // Reset form
    setMode('login');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <VStack spacing="8">
        <Box textAlign="center">
          <Heading mb="2">GameClub</Heading>
          <Text color="gray.600">
            {mode === 'login'
              ? 'Prijavite se na svoj račun'
              : 'Kreirajte novi račun'}
          </Text>
        </Box>

        <VStack width="full" spacing="4">
          {mode === 'register' && (
            <>
              <Input
                placeholder="Ime"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
              <Input
                placeholder="Prezime"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </>
          )}

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <InputGroup>
            <Input
              placeholder="Lozinka"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <InputRightElement>
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                bg="transparent"
                _hover={{ bg: 'transparent' }}
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button
            width="full"
            colorScheme="blue"
            onClick={mode === 'login' ? handleLogin : handleRegister}
            isDisabled={loading}
          >
            {loading ? (
              <Spinner size="sm" />
            ) : mode === 'login' ? (
              'Prijava'
            ) : (
              'Registracija'
            )}
          </Button>
        </VStack>

        <HStack justify="center" width="full">
          <Text fontSize="sm">
            {mode === 'login'
              ? 'Nemate račun?'
              : 'Već imate račun?'}
          </Text>
          <Button
            variant="link"
            colorScheme="blue"
            fontSize="sm"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setEmail('');
              setPassword('');
              setFirstName('');
              setLastName('');
            }}
          >
            {mode === 'login' ? 'Kreiraj račun' : 'Prijava'}
          </Button>
        </HStack>
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleDialogClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Registracija uspješna!
            </AlertDialogHeader>
            <AlertDialogBody>
              Vaš račun je kreiran. Dobrodošli u GameClub!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={handleDialogClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isErrorOpen}
        leastDestructiveRef={errorCancelRef}
        onClose={onErrorClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="red.600">
              ⚠️ Greška
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
