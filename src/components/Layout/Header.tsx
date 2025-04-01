/**
 * Header Component
 * 
 * A Material-UI based application header that implements:
 * 1. Fixed positioning at the top of the application
 * 2. Theme switching functionality
 * 3. Responsive layout using MUI's Flexbox utilities
 * 
 * Technical Concepts Demonstrated:
 * - Material-UI (MUI) Components: AppBar, Toolbar, Menu, etc.
 * - React Hooks: useState for menu state management
 * - TypeScript: Type definitions and React.FC (Function Component)
 * - Custom Theme Context: Integration with app-wide theming system
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeContext';

/**
 * Header Component
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
const Header: React.FC = () => {
  // Access theme context for dynamic theme switching
  const { currentTheme, setTheme } = useTheme();
  
  // State for managing the theme selection menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  /**
   * Handles opening the theme menu
   * @param event - React mouse event containing the target element
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles closing the theme menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles theme selection and updates the global theme
   * @param theme - The selected theme identifier
   */
  const handleThemeChange = (theme: 'broadridge' | 'dark' | 'ocean' | 'forest' | 'nyc' | 'hibeanie' | 'india') => {
    setTheme(theme);
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} // Ensures header stays above sidebar
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Application Title */}
        <Typography variant="h6" noWrap component="div">
          Resource Management Dashboard
        </Typography>

        {/* Theme Selection Menu */}
        <Box>
          <IconButton
            color="inherit"
            onClick={handleClick}
            size="large"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PaletteIcon />
            <Typography variant="body1">Style</Typography>
          </IconButton>

          {/* Theme Selection Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {/* Theme Options - Each MenuItem represents a different theme */}
            <MenuItem 
              onClick={() => handleThemeChange('broadridge')}
              selected={currentTheme === 'broadridge'}
            >
              Broadridge
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('dark')}
              selected={currentTheme === 'dark'}
            >
              Dark
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('ocean')}
              selected={currentTheme === 'ocean'}
            >
              Ocean
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('forest')}
              selected={currentTheme === 'forest'}
            >
              Forest
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('nyc')}
              selected={currentTheme === 'nyc'}
            >
              New York City
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('hibeanie')}
              selected={currentTheme === 'hibeanie'}
            >
              Hi Beanie
            </MenuItem>
            <MenuItem 
              onClick={() => handleThemeChange('india')}
              selected={currentTheme === 'india'}
            >
              India
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 