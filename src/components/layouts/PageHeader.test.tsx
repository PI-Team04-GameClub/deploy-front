import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import PageHeader from './PageHeader';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('PageHeader', () => {
  it('renders title correctly', () => {
    renderWithChakra(<PageHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders action button when actionLabel and onAction provided', () => {
    const onAction = () => {};
    renderWithChakra(
      <PageHeader title="Title" actionLabel="Create" onAction={onAction} />
    );
    
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('does not render action button when actionLabel is missing', () => {
    renderWithChakra(<PageHeader title="Title" />);
    
    const button = screen.queryByRole('button');
    expect(button).toBeNull();
  });

  it('calls onAction when action button clicked', () => {
    let clicked = false;
    const onAction = () => { clicked = true; };
    
    renderWithChakra(
      <PageHeader title="Title" actionLabel="Click" onAction={onAction} />
    );
    
    fireEvent.click(screen.getByText('Click'));
    expect(clicked).toBe(true);
  });

  it('applies custom heading size', () => {
    renderWithChakra(<PageHeader title="Title" headingSize="2xl" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
