import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import SubmitButton from './SubmitButton';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('SubmitButton', () => {
  it('renders with children text', () => {
    renderWithChakra(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    renderWithChakra(<SubmitButton>Submit Form</SubmitButton>);
    expect(screen.getByText('Submit Form')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithChakra(<SubmitButton onClick={onClick}>Click Me</SubmitButton>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows spinner when loading is true', () => {
    renderWithChakra(<SubmitButton loading>Submit</SubmitButton>);
    
    // When loading, button should show spinner instead of children
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('is disabled when loading is true', () => {
    renderWithChakra(<SubmitButton loading>Submit</SubmitButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('uses custom colorScheme', () => {
    renderWithChakra(<SubmitButton colorScheme="red">Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('chakra-button');
  });

  it('uses custom width', () => {
    renderWithChakra(<SubmitButton width="50%">Submit</SubmitButton>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('passes additional props to button', () => {
    renderWithChakra(<SubmitButton data-testid="custom-btn">Submit</SubmitButton>);
    expect(screen.getByTestId('custom-btn')).toBeInTheDocument();
  });
});
