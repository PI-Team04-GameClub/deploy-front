import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, InputProps } from '@chakra-ui/react';

interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showLabel?: string;
  hideLabel?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  showLabel = 'Show',
  hideLabel = 'Hide',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
          variant="ghost"
        >
          {showPassword ? hideLabel : showLabel}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
