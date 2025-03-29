import React from 'react';
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
  Typography,
  Divider,
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [awsOpen, setAwsOpen] = React.useState(false);

  const handleAwsClick = () => {
    setAwsOpen(!awsOpen);
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

          <Divider sx={{ my: 2 }} />

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
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 