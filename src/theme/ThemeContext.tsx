import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, ThemeOptions } from '@mui/material';

export type ThemeMode = 'broadridge' | 'dark' | 'ocean' | 'forest' | 'nyc' | 'hibeanie' | 'india';

const themes = {
  broadridge: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#003865', // Broadridge Deep Blue
        light: '#0055a0',
        dark: '#002845',
      },
      secondary: {
        main: '#0077c8', // Broadridge Light Blue
        light: '#4da3ff',
        dark: '#005c9f',
      },
      background: {
        default: '#f5f7fa', // Light Gray Background
        paper: '#ffffff',
      },
      error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
      },
      warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
      },
      info: {
        main: '#0077c8', // Broadridge Light Blue
        light: '#4da3ff',
        dark: '#005c9f',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      text: {
        primary: '#1c2b3e', // Dark Blue Text
        secondary: 'rgba(28, 43, 62, 0.7)',
      },
      divider: 'rgba(0, 56, 101, 0.12)',
    },
    typography: {
      fontFamily: "'Open Sans', 'Arial', sans-serif",
      h1: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 600,
      },
      h4: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 500,
      },
      button: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
      subtitle1: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 500,
      },
      subtitle2: {
        fontFamily: "'Open Sans', 'Arial', sans-serif",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to right, #003865, #0055a0)',
            boxShadow: '0 4px 20px rgba(0, 56, 101, 0.15)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            '&.MuiCard-root': {
              boxShadow: '0 8px 32px rgba(0, 56, 101, 0.08)',
              borderRadius: 8,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 600,
            '&.MuiButton-contained': {
              backgroundImage: 'linear-gradient(to right, #003865, #0055a0)',
              boxShadow: '0 4px 12px rgba(0, 56, 101, 0.2)',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)',
            boxShadow: '4px 0 20px rgba(0, 56, 101, 0.08)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(0, 56, 101, 0.12)',
              '&:hover': {
                backgroundColor: 'rgba(0, 56, 101, 0.18)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 56, 101, 0.08)',
              transition: 'background-color 0.3s ease',
            },
          },
        },
      },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
        light: '#e3f2fd',
        dark: '#42a5f5',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(144, 202, 249, 0.24)',
              '&:hover': {
                backgroundColor: 'rgba(144, 202, 249, 0.32)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(144, 202, 249, 0.16)',
            },
          },
        },
      },
    },
  }),
  ocean: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#00acc1', // Tropical Ocean Blue
        light: '#26c6da',
        dark: '#007c91',
      },
      secondary: {
        main: '#ff6f00', // Sunset Orange
        light: '#ff9e40',
        dark: '#c43e00',
      },
      background: {
        default: '#e0f7fa', // Light Sea Foam
        paper: '#ffffff',
      },
      error: {
        main: '#ff3d00', // Coral Red
        light: '#ff6e40',
        dark: '#dd2c00',
      },
      warning: {
        main: '#ffd740', // Sand Yellow
        light: '#ffe57f',
        dark: '#ffc400',
      },
      info: {
        main: '#80deea', // Light Lagoon
        light: '#b4ffff',
        dark: '#4bacb8',
      },
      success: {
        main: '#00c853', // Tropical Palm
        light: '#5efc82',
        dark: '#009624',
      },
      text: {
        primary: '#01579b', // Deep Ocean Blue
        secondary: 'rgba(1, 87, 155, 0.7)',
      },
      divider: 'rgba(0, 172, 193, 0.12)',
    },
    typography: {
      fontFamily: "'Montserrat', 'Roboto', sans-serif", // Clean, modern beach resort style
      h1: {
        fontFamily: "'Pacifico', 'cursive'", // Tropical wave style
        fontWeight: 400,
      },
      h2: {
        fontFamily: "'Pacifico', 'cursive'",
        fontWeight: 400,
      },
      h3: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500,
      },
      h4: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 500,
      },
      button: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.05em',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to right, #00acc1, #26c6da)', // Ocean gradient
            boxShadow: '0 4px 20px rgba(0, 172, 193, 0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)',
            '&.MuiCard-root': {
              boxShadow: '0 8px 32px rgba(0, 172, 193, 0.1)',
              borderRadius: 16, // Smooth like beach pebbles
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 24, // Rounded like shells
            textTransform: 'none',
            fontWeight: 600,
            '&.MuiButton-contained': {
              backgroundImage: 'linear-gradient(to right, #00acc1, #26c6da)',
              boxShadow: '0 4px 12px rgba(0, 172, 193, 0.3)',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #e0f7fa 100%)',
            boxShadow: '4px 0 20px rgba(0, 172, 193, 0.1)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 111, 0, 0.20)',
              '&:hover': {
                backgroundColor: 'rgba(255, 111, 0, 0.28)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 111, 0, 0.12)',
              transition: 'background-color 0.3s ease',
            },
          },
        },
      },
    },
  }),
  forest: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      secondary: {
        main: '#66bb6a',
      },
      background: {
        default: '#e8f5e9',
        paper: '#ffffff',
      },
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(102, 187, 106, 0.20)',
              '&:hover': {
                backgroundColor: 'rgba(102, 187, 106, 0.28)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(102, 187, 106, 0.12)',
            },
          },
        },
      },
    },
  }),
  nyc: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffc107', // NYC Taxi Yellow
        light: '#ffd54f',
        dark: '#ffa000',
      },
      secondary: {
        main: '#757575', // Modern Skyscraper Steel
        light: '#9e9e9e',
        dark: '#424242',
      },
      background: {
        default: '#485461', // Wet Concrete
        paper: '#5d6d7e', // Lighter Wet Concrete
      },
      error: {
        main: '#e41d1d', // Broadway Red
        light: '#ff1744',
        dark: '#d50000',
      },
      warning: {
        main: '#ff9800', // Sunset Orange
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#40c4ff', // Neon Blue
        light: '#80d8ff',
        dark: '#00b0ff',
      },
      success: {
        main: '#00e676', // Times Square Green
        light: '#69f0ae',
        dark: '#00c853',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: "'Helvetica Neue', 'Gotham', 'Arial', sans-serif",
      h1: {
        fontFamily: "'Impact', 'Arial Black', sans-serif", // NYC Tabloid style
        letterSpacing: '0.02em',
        fontWeight: 700,
      },
      h2: {
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        letterSpacing: '0.01em',
      },
      h3: {
        fontFamily: "'Helvetica Neue', 'Gotham', sans-serif",
        fontWeight: 600,
      },
      h4: {
        fontFamily: "'Helvetica Neue', 'Gotham', sans-serif",
        fontWeight: 500,
      },
      button: {
        fontFamily: "'Helvetica Neue', 'Gotham', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.05em',
      },
      subtitle1: {
        fontFamily: "'Helvetica Neue', 'Gotham', sans-serif",
        fontWeight: 500,
      },
      subtitle2: {
        fontFamily: "'Helvetica Neue', 'Gotham', sans-serif",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to right, #0d1b3e, #1a2a57)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, #1a2a57 0%, #0d1b3e 100%)',
            '&.MuiCard-root': {
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 600,
            '&.MuiButton-contained': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'linear-gradient(180deg, #0d1b3e 0%, #1a2a57 100%)',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 193, 7, 0.25)',
              '&:hover': {
                backgroundColor: 'rgba(255, 193, 7, 0.35)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 193, 7, 0.15)',
              transition: 'background-color 0.3s ease',
            },
          },
        },
      },
    },
  }),
  hibeanie: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FF9F1C',  // Vibrant orange
        light: '#FFB74D',
        dark: '#F57C00',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#4ECDC4',  // Turquoise accent
        light: '#6ED7D0',
        dark: '#3BA39B',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F7F7F7', // Light gray background
        paper: '#FFFFFF',   // White paper background
      },
      text: {
        primary: '#2C3E50',   // Dark blue-gray text
        secondary: '#7F8C8D',  // Medium gray text
      },
      error: {
        main: '#E74C3C',  // Error red
      },
      warning: {
        main: '#F1C40F',  // Warning yellow
      },
      success: {
        main: '#2ECC71',  // Success green
      },
      info: {
        main: '#3498DB',  // Info blue
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        color: '#2C3E50',
      },
      h2: {
        fontWeight: 600,
        color: '#2C3E50',
      },
      h3: {
        fontWeight: 600,
        color: '#2C3E50',
      },
      h4: {
        fontWeight: 500,
        color: '#2C3E50',
      },
      h5: {
        fontWeight: 500,
        color: '#2C3E50',
      },
      h6: {
        fontWeight: 500,
        color: '#2C3E50',
      },
      body1: {
        fontSize: '1rem',
        color: '#2C3E50',
      },
      body2: {
        fontSize: '0.875rem',
        color: '#7F8C8D',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
          },
          contained: {
            backgroundImage: 'linear-gradient(135deg, #FF9F1C 0%, #FFB74D 100%)',
            boxShadow: '0 2px 8px rgba(255, 159, 28, 0.25)',
            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #FFB74D 0%, #FF9F1C 100%)',
              boxShadow: '0 4px 12px rgba(255, 159, 28, 0.3)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&.MuiCard-root': {
              backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #F7F7F7 100%)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(to right, #FF9F1C, #4ECDC4)',
            color: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(255, 159, 28, 0.15)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%)',
            borderRight: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '4px 0 16px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            margin: '4px 8px',
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 159, 28, 0.12)',
              '&:hover': {
                backgroundColor: 'rgba(255, 159, 28, 0.18)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 159, 28, 0.08)',
              transition: 'all 0.2s ease',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#FF9F1C',
          },
        },
      },
    },
  }),
  india: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FF9933', // Deep Saffron (from Indian flag)
        light: '#FFB366',
        dark: '#CC7A29',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#138808', // India Green (from Indian flag)
        light: '#1AB80E',
        dark: '#0E6606',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#FFF9E6', // Light Cream (inspired by traditional Indian textiles)
        paper: '#FFFFFF',
      },
      error: {
        main: '#D16E6E', // Sindoor Red
        light: '#DB8A8A',
        dark: '#A75757',
      },
      warning: {
        main: '#B4832E', // Turmeric Gold
        light: '#C69B4D',
        dark: '#8F6925',
      },
      info: {
        main: '#0066B3', // Royal Blue (inspired by Blue Pottery)
        light: '#1A8AD6',
        dark: '#004D86',
      },
      success: {
        main: '#138808', // India Green
        light: '#1AB80E',
        dark: '#0E6606',
      },
      text: {
        primary: '#2C1810', // Deep Brown (inspired by traditional wood carvings)
        secondary: 'rgba(44, 24, 16, 0.7)',
      },
      divider: 'rgba(180, 131, 46, 0.12)',
    },
    typography: {
      fontFamily: "'Poppins', 'Arial', sans-serif",
      h1: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
      h2: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
      h3: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 600,
      },
      h4: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 500,
      },
      button: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.03em',
      },
      subtitle1: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 500,
      },
      subtitle2: {
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(45deg, #FF9933 0%, #138808 100%)', // Gradient using Indian flag colors
            boxShadow: '0 4px 20px rgba(255, 153, 51, 0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9E6 100%)',
            '&.MuiCard-root': {
              boxShadow: '0 8px 32px rgba(180, 131, 46, 0.1)',
              borderRadius: 16,
              border: '1px solid rgba(180, 131, 46, 0.08)', // Subtle border inspired by traditional patterns
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            '&.MuiButton-contained': {
              backgroundImage: 'linear-gradient(45deg, #FF9933 30%, #FFB366 90%)',
              boxShadow: '0 4px 12px rgba(255, 153, 51, 0.3)',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FFF9E6 100%)',
            boxShadow: '4px 0 20px rgba(180, 131, 46, 0.1)',
            borderRight: '1px solid rgba(180, 131, 46, 0.08)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 153, 51, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255, 153, 51, 0.25)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 153, 51, 0.08)',
              transition: 'background-color 0.3s ease',
            },
          },
        },
      },
    },
  }),
};

interface ThemeContextType {
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'broadridge',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('broadridge');

  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <MuiThemeProvider theme={themes[currentTheme]}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 