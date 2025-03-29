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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCustomPages } from '../../context/CustomPagesContext';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [awsOpen, setAwsOpen] = useState(false);
  const [customPagesOpen, setCustomPagesOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const { pages, addPage, removePage, resetAllPages } = useCustomPages();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleAwsClick = () => {
    setAwsOpen(!awsOpen);
  };

  const handleCustomPagesClick = () => {
    setCustomPagesOpen(!customPagesOpen);
  };

  const handleAddPage = () => {
    if (newPageTitle.trim()) {
      addPage(newPageTitle);
      setIsDialogOpen(false);
      setNewPageTitle('');
    }
  };

  const handleReset = () => {
    resetAllPages();
    setShowResetConfirm(false);
    navigate('/');
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
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Entry Page" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/app-info')}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="App Info" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/platform-info')}>
              <ListItemIcon>
                <Cloud />
              </ListItemIcon>
              <ListItemText primary="Platform Info" />
            </ListItemButton>
          </ListItem>

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

          <Collapse in={awsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/ec2')}
              >
                <ListItemIcon>
                  <Computer />
                </ListItemIcon>
                <ListItemText primary="EC2 Instances" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/rds')}
              >
                <ListItemIcon>
                  <Dataset />
                </ListItemIcon>
                <ListItemText primary="RDS Clusters" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/s3')}
              >
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary="S3 Buckets" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate('/aws-inventory/vpc')}
              >
                <ListItemIcon>
                  <Router />
                </ListItemIcon>
                <ListItemText primary="VPCs" />
              </ListItemButton>

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

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create New Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Page Title"
            fullWidth
            value={newPageTitle}
            onChange={(e) => setNewPageTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddPage} variant="contained">
            Create
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
    </Drawer>
  );
};

export default Sidebar; 