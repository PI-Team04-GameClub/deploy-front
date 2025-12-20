import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Outfit", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    brand: {
      50: '#f0e7ff',
      100: '#d4bcff',
      200: '#b891ff',
      300: '#9c66ff',
      400: '#803bff',
      500: '#6610f2',
      600: '#520dc2',
      700: '#3d0a91',
      800: '#280661',
      900: '#140330',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#f7fafc',
        color: '#1a202c',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'sm',
          border: '1px solid',
          borderColor: 'gray.100',
          transition: 'all 0.3s',
        },
      },
    },
  },
});

export default theme;
