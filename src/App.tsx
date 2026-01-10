import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './styles/theme';
import Navbar from './components/navbars/Navbar';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import GamesPage from './pages/games/GamesPage';
import TeamsPage from './pages/teams/TeamsPage';
import TournamentsPage from './pages/tournaments/TournamentsPage';
import NewsPage from './pages/news/NewsPage';
import { AuthProvider, useAuth } from './context';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box position="relative" minH="100vh">
      {/* Blurry background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="url('/assets/board_games_background.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="blur(8px)"
        transform="scale(1.1)"
        zIndex={-1}
      />
      {/* White overlay for subtle background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="whiteAlpha.700"
        zIndex={-1}
      />
      {isAuthenticated && <Navbar />}
      <Box minH={isAuthenticated ? 'calc(100vh - 73px)' : '100vh'}>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/news" replace /> : <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/news" replace /> : <RegisterPage />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/news" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/news"
            element={
              isAuthenticated ? <NewsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/games"
            element={
              isAuthenticated ? <GamesPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/teams"
            element={
              isAuthenticated ? <TeamsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/tournaments"
            element={
              isAuthenticated ? <TournamentsPage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
