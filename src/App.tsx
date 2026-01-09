import React, { useState, useEffect } from 'react';
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
import { authService } from './services/auth_service';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!authService.getToken());

  useEffect(() => {
    // Listen for storage changes (when token is set in another tab/window)
    const handleStorageChange = () => {
      setIsAuthenticated(!!authService.getToken());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update isAuthenticated when token changes
  useEffect(() => {
    const token = authService.getToken();
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
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
      </Router>
    </ChakraProvider>
  );
};

export default App;
