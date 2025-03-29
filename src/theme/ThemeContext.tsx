import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

type ThemeMode = 'light' | 'dark' | 'ocean' | 'forest';

const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
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
  }),
  ocean: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#006064',
        light: '#0097a7',
        dark: '#00363a',
      },
      secondary: {
        main: '#00acc1',
      },
      background: {
        default: '#e0f7fa',
        paper: '#ffffff',
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
  }),
};

interface ThemeContextType {
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');

  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <MuiThemeProvider theme={themes[currentTheme]}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 