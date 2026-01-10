import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import ActionButtons from './ActionButtons';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('ActionButtons', () => {
  it('renders nothing when no handlers provided', () => {
    const { container } = renderWithChakra(<ActionButtons />);
    expect(container.querySelector('button')).toBeNull();
  });

  it('renders edit button when onEdit is provided', () => {
    const onEdit = vi.fn();
    renderWithChakra(<ActionButtons onEdit={onEdit} />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('renders delete button when onDelete is provided', () => {
    const onDelete = vi.fn();
    renderWithChakra(<ActionButtons onDelete={onDelete} />);
    
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders both buttons when both handlers provided', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    renderWithChakra(<ActionButtons onEdit={onEdit} onDelete={onDelete} />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    renderWithChakra(<ActionButtons onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    renderWithChakra(<ActionButtons onDelete={onDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('renders custom edit label', () => {
    const onEdit = vi.fn();
    renderWithChakra(<ActionButtons onEdit={onEdit} editLabel="Modify" />);
    
    expect(screen.getByText('Modify')).toBeInTheDocument();
  });

  it('renders custom delete label', () => {
    const onDelete = vi.fn();
    renderWithChakra(<ActionButtons onDelete={onDelete} deleteLabel="Remove" />);
    
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const onEdit = vi.fn();
    renderWithChakra(<ActionButtons onEdit={onEdit} size="lg" />);
    
    const button = screen.getByText('Edit');
    expect(button).toBeInTheDocument();
  });
});
