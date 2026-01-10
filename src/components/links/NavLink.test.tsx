import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import NavLink from './NavLink';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ChakraProvider>
  );
};

describe('NavLink', () => {
  it('renders link with correct text', () => {
    renderWithProviders(<NavLink to="/home">Home</NavLink>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    renderWithProviders(<NavLink to="/games">Games</NavLink>);
    const link = screen.getByText('Games').closest('a');
    expect(link).toHaveAttribute('href', '/games');
  });

  it('renders multiple NavLinks correctly', () => {
    renderWithProviders(
      <>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/teams">Teams</NavLink>
      </>
    );
    
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
  });
});
