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

const Header: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: 'broadridge' | 'dark' | 'ocean' | 'forest' | 'nyc') => {
    setTheme(theme);
    handleClose();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Resource Management Dashboard
        </Typography>
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
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 