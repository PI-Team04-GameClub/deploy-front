import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ErrorAlert from './ErrorAlert';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('ErrorAlert', () => {
  it('renders when isOpen is true', () => {
    const cancelRef = React.createRef<HTMLButtonElement>();
    renderWithChakra(
      <ErrorAlert
        isOpen={true}
        onClose={() => {}}
        message="Something went wrong"
        cancelRef={cancelRef}
      />
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders default title "Error"', () => {
    const cancelRef = React.createRef<HTMLButtonElement>();
    renderWithChakra(
      <ErrorAlert
        isOpen={true}
        onClose={() => {}}
        message="Error message"
        cancelRef={cancelRef}
      />
    );
    
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    const cancelRef = React.createRef<HTMLButtonElement>();
    renderWithChakra(
      <ErrorAlert
        isOpen={true}
        onClose={() => {}}
        message="Error message"
        title="Custom Error"
        cancelRef={cancelRef}
      />
    );
    
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });

  it('renders default button text "OK"', () => {
    const cancelRef = React.createRef<HTMLButtonElement>();
    renderWithChakra(
      <ErrorAlert
        isOpen={true}
        onClose={() => {}}
        message="Error message"
        cancelRef={cancelRef}
      />
    );
    
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    const cancelRef = React.createRef<HTMLButtonElement>();
    renderWithChakra(
      <ErrorAlert
        isOpen={true}
        onClose={() => {}}
        message="Error message"
        buttonText="Close"
        cancelRef={cancelRef}
      />
    );
    
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls onClose when button is clicked', () => {
    const onClose = vi.fn();
    const cancelRef = React.createRef<HTMLButtonElement>();
    renderWithChakra(
      <ErrorAlert
        isOpen={true}
        onClose={onClose}
        message="Error message"
        cancelRef={cancelRef}
      />
    );
    
    fireEvent.click(screen.getByText('OK'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
