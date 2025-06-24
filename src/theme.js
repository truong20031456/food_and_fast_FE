import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#E64A4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#71D7D0',
      dark: '#2BB5AB',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F7F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.05)',
    '0 4px 8px rgba(0, 0, 0, 0.05)',
    '0 6px 12px rgba(0, 0, 0, 0.05)',
    '0 8px 16px rgba(0, 0, 0, 0.05)',
    '0 10px 20px rgba(0, 0, 0, 0.05)',
    '0 12px 24px rgba(0, 0, 0, 0.05)',
    '0 14px 28px rgba(0, 0, 0, 0.05)',
    '0 16px 32px rgba(0, 0, 0, 0.05)',
    '0 18px 36px rgba(0, 0, 0, 0.05)',
    '0 20px 40px rgba(0, 0, 0, 0.05)',
    '0 22px 44px rgba(0, 0, 0, 0.05)',
    '0 24px 48px rgba(0, 0, 0, 0.05)',
    '0 26px 52px rgba(0, 0, 0, 0.05)',
    '0 28px 56px rgba(0, 0, 0, 0.05)',
    '0 30px 60px rgba(0, 0, 0, 0.05)',
    '0 32px 64px rgba(0, 0, 0, 0.05)',
    '0 34px 68px rgba(0, 0, 0, 0.05)',
    '0 36px 72px rgba(0, 0, 0, 0.05)',
    '0 38px 76px rgba(0, 0, 0, 0.05)',
    '0 40px 80px rgba(0, 0, 0, 0.05)',
    '0 42px 84px rgba(0, 0, 0, 0.05)',
    '0 44px 88px rgba(0, 0, 0, 0.05)',
    '0 46px 92px rgba(0, 0, 0, 0.05)',
    '0 48px 96px rgba(0, 0, 0, 0.05)',
  ],
});

export default theme; 