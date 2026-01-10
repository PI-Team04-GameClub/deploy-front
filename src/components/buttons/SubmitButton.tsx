import React from 'react';
import { Button, Spinner, ButtonProps } from '@chakra-ui/react';

interface SubmitButtonProps extends Omit<ButtonProps, 'isDisabled'> {
  loading?: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  children,
  colorScheme = 'brand',
  width = 'full',
  ...props
}) => {
  return (
    <Button
      width={width}
      colorScheme={colorScheme}
      isDisabled={loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </Button>
  );
};

export default SubmitButton;
