import { createTheme } from '@mui/material/styles';

const cyberTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
      light: '#4de3ff',
      dark: '#0099cc',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff9999',
      dark: '#cc5555',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff4757',
      light: '#ff6b7a',
      dark: '#cc3846',
    },
    warning: {
      main: '#ffa726',
      light: '#ffcc80',
      dark: '#cc8600',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    info: {
      main: '#29b6f6',
      light: '#73e8ff',
      dark: '#0086c3',
    },
    background: {
      default: '#0a0a0f',
      paper: 'rgba(26, 26, 46, 0.8)',
      card: 'rgba(22, 33, 62, 0.6)',
      glass: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    // Custom cyber colors
    cyber: {
      neon: '#00d4ff',
      matrix: '#00ff41',
      warning: '#ff6b6b',
      dark: '#0a0a0f',
      glass: 'rgba(255, 255, 255, 0.05)',
      glow: 'rgba(0, 212, 255, 0.3)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontFamilyMono: [
      'Fira Code',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#ffffff',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#00d4ff',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.6)',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: 'rgba(255, 255, 255, 0.5)',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 212, 255, 0.1)',
    '0 4px 6px rgba(0, 212, 255, 0.1)',
    '0 5px 15px rgba(0, 212, 255, 0.15)',
    '0 10px 24px rgba(0, 212, 255, 0.15)',
    '0 15px 35px rgba(0, 212, 255, 0.15)',
    '0 20px 25px rgba(0, 212, 255, 0.1)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
    '0 25px 50px rgba(0, 212, 255, 0.25)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #4de3ff, #00d4ff)',
              boxShadow: '0 6px 20px rgba(0, 212, 255, 0.4)',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#00d4ff',
            color: '#00d4ff',
            '&:hover': {
              borderColor: '#4de3ff',
              backgroundColor: 'rgba(0, 212, 255, 0.1)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 212, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d4ff',
              boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 212, 255, 0.1)',
          color: '#00d4ff',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          '&.MuiChip-colorSecondary': {
            background: 'rgba(255, 107, 107, 0.1)',
            color: '#ff6b6b',
            border: '1px solid rgba(255, 107, 107, 0.3)',
          },
          '&.MuiChip-colorSuccess': {
            background: 'rgba(76, 175, 80, 0.1)',
            color: '#4caf50',
            border: '1px solid rgba(76, 175, 80, 0.3)',
          },
        },
      },
    },
  },
});

export default cyberTheme;