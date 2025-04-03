/**
 * Sidebar Navigation Component
 * 
 * A Material-UI based sidebar that implements:
 * 1. Permanent drawer navigation
 * 2. Hierarchical menu structure with collapsible sections
 * 3. Dynamic custom pages management
 * 4. React Router integration for navigation
 * 
 * Technical Concepts Demonstrated:
 * - Material-UI Components: Drawer, List, Collapse, Dialog
 * - React Router: useNavigate and useLocation hooks for navigation
 * - React State Management: useState for local UI state
 * - Custom Context Integration: useCustomPages for managing dynamic pages
 * - TypeScript: Type definitions and React.FC
 */

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Home,
  Info,
  Cloud,
  Storage,
  ExpandLess,
  ExpandMore,
  Computer,
  Dataset,
  Folder,
  Router,
  Apps,
  Dashboard,
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCustomPages } from '../../context/CustomPagesContext';
import { parse } from 'yaml';

// Width of the drawer in pixels - MUI recommended width for permanent drawers
const drawerWidth = 240;

/**
 * Sidebar Component
 * 
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 */
const Sidebar: React.FC = () => {
  // Router hooks for navigation and location tracking
  const navigate = useNavigate();
  const location = useLocation();

  // Local state for managing collapsible sections
  const [awsOpen, setAwsOpen] = useState(false);
  const [customPagesOpen, setCustomPagesOpen] = useState(true);
  
  // State for managing the "Add New Page" dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [importJson, setImportJson] = useState('');
  const [showImportTab, setShowImportTab] = useState(false);
  
  // Custom pages context for managing dynamic pages
  const { pages, addPage, removePage, resetAllPages, importPage } = useCustomPages();
  
  // State for reset confirmation dialog
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Toggles the AWS resources section expansion state
   */
  const handleAwsClick = () => {
    setAwsOpen(!awsOpen);
  };

  /**
   * Toggles the Custom Pages section expansion state
   */
  const handleCustomPagesClick = () => {
    setCustomPagesOpen(!customPagesOpen);
  };

  /**
   * Handles the creation of a new custom page
   * Validates and adds the page to the context
   */
  const handleAddPage = () => {
    if (newPageTitle.trim()) {
      addPage(newPageTitle);
      setIsDialogOpen(false);
      setNewPageTitle('');
    }
  };

  /**
   * Handles resetting all custom pages
   * Navigates to home page after reset
   */
  const handleReset = () => {
    resetAllPages();
    setShowResetConfirm(false);
    navigate('/');
  };

  /**
   * Handles creating a new page from YAML configuration
   */
  const handleImportPage = () => {
    try {
      const config = parse(importJson);
      importPage(config);
      setIsDialogOpen(false);
      setImportJson('');
      setShowImportTab(false);
      setError(null);
    } catch (error) {
      console.error('Invalid YAML configuration:', error);
      setError(error instanceof Error ? error.message : 'Invalid YAML configuration');
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar /> {/* Spacer to account for app bar height */}
      <Box sx={{ overflow: 'auto' }}>
        {/* Main Navigation List */}
        <List>
          {/* Entry Page Navigation */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Entry Page" />
            </ListItemButton>
          </ListItem>

          {/* App Info Navigation */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/app-info')}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="App Info" />
            </ListItemButton>
          </ListItem>

          {/* Platform Info Navigation */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/platform-info')}>
              <ListItemIcon>
                <Cloud />
              </ListItemIcon>
              <ListItemText primary="Platform Info" />
            </ListItemButton>
          </ListItem>

          {/* AWS Resources Section */}
          <ListItem
            sx={{
              bgcolor: 'action.selected',
              borderRadius: 1,
              mx: 1,
              width: 'auto',
            }}
          >
            <ListItemButton onClick={handleAwsClick} sx={{ p: 0 }}>
              <ListItemIcon>
                <Storage />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="subtitle2" color="text.primary" fontWeight="medium">
                    AWS Resource Inventory
                  </Typography>
                }
              />
              {awsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          {/* AWS Resources Submenu */}
          <Collapse in={awsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* EC2 Navigation */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/ec2')}
              >
                <ListItemIcon>
                  <Computer />
                </ListItemIcon>
                <ListItemText primary="EC2 Instances" />
              </ListItemButton>

              {/* RDS Navigation */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/rds')}
              >
                <ListItemIcon>
                  <Dataset />
                </ListItemIcon>
                <ListItemText primary="RDS Clusters" />
              </ListItemButton>

              {/* S3 Navigation */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/s3')}
              >
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary="S3 Buckets" />
              </ListItemButton>

              {/* VPC Navigation */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/vpc')}
              >
                <ListItemIcon>
                  <Router />
                </ListItemIcon>
                <ListItemText primary="VPCs" />
              </ListItemButton>

              {/* ECS Navigation */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/ecs')}
              >
                <ListItemIcon>
                  <Apps />
                </ListItemIcon>
                <ListItemText primary="ECS" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Custom Pages Section */}
          <ListItem
            sx={{
              bgcolor: 'action.selected',
              borderRadius: 1,
              mx: 1,
              width: 'auto',
              mt: 2,
            }}
          >
            <ListItemButton onClick={handleCustomPagesClick} sx={{ p: 0 }}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="subtitle2" color="text.primary" fontWeight="medium">
                    Custom Pages
                  </Typography>
                }
              />
              {customPagesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          {/* Custom Pages Dynamic List */}
          <Collapse in={customPagesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {pages.map((page) => (
                <ListItemButton
                  key={page.id}
                  sx={{ pl: 4 }}
                  onClick={() => navigate(`/custom/${page.id}`)}
                >
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary={page.title} />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePage(page.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemButton>
              ))}
              {/* Add New Page Button */}
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setIsDialogOpen(true)}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add New Page" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>

      <Box sx={{ position: 'fixed', bottom: 0, width: drawerWidth, p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Tooltip title="Reset all custom pages and modifications">
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<RefreshIcon />}
            onClick={() => setShowResetConfirm(true)}
          >
            Reset All
          </Button>
        </Tooltip>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setShowImportTab(false);
          setImportJson('');
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Page</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={showImportTab ? 1 : 0}
              onChange={(_, newValue) => setShowImportTab(newValue === 1)}
              aria-label="add page tabs"
            >
              <Tab label="Create New" />
              <Tab label="Import Configuration" />
            </Tabs>
          </Box>

          {showImportTab ? (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Paste the page configuration YAML below:
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={15}
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder="Paste configuration YAML here..."
                error={importJson !== '' && !isValidYaml(importJson)}
                helperText={importJson !== '' && !isValidYaml(importJson) ? 'Invalid YAML format' : ''}
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }
                }}
              />
            </>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="Page Title"
              fullWidth
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsDialogOpen(false);
            setShowImportTab(false);
            setImportJson('');
          }}>
            Cancel
          </Button>
          <Button
            onClick={showImportTab ? handleImportPage : handleAddPage}
            variant="contained"
            color="primary"
            disabled={showImportTab ? !isValidYaml(importJson) : !newPageTitle.trim()}
          >
            {showImportTab ? 'Import' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showResetConfirm} onClose={() => setShowResetConfirm(false)}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
          Are you sure you want to reset all custom pages? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResetConfirm(false)}>Cancel</Button>
          <Button onClick={handleReset} color="error" variant="contained">
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

// Helper function to validate YAML
const isValidYaml = (str: string): boolean => {
  try {
    parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export default Sidebar; 