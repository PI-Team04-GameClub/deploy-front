import React from 'react';
import { HStack, Heading, Button, HeadingProps } from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  actionColorScheme?: string;
  headingSize?: HeadingProps['size'];
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actionLabel,
  onAction,
  actionColorScheme = 'brand',
  headingSize = 'xl',
}) => {
  return (
    <HStack justify="space-between" mb={6}>
      <Heading
        size={headingSize}
        fontWeight="800"
        color="white"
      >
        {title}
      </Heading>
      {actionLabel && onAction && (
        <Button
          colorScheme={actionColorScheme}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </HStack>
  );
};

export default PageHeader;
