import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeContext';

const Header: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'ocean' | 'forest') => {
    setTheme(theme);
    handleClose();
  };

  const getThemeLabel = (theme: string) => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Resource Management Dashboard
        </Typography>
        <Button
          color="inherit"
          onClick={handleClick}
          startIcon={<PaletteIcon />}
          sx={{ ml: 2 }}
        >
          Style
        </Button>
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
          {['light', 'dark', 'ocean', 'forest'].map((theme) => (
            <MenuItem
              key={theme}
              onClick={() => handleThemeChange(theme as 'light' | 'dark' | 'ocean' | 'forest')}
              selected={currentTheme === theme}
            >
              {getThemeLabel(theme)}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 