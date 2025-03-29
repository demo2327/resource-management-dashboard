import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import GridLayout from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import { useCustomPages } from '../context/CustomPagesContext';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const WIDGET_TYPES = [
  { type: 'default', label: 'Default Widget' },
  { type: 'inventory', label: 'Inventory Widget' },
  // Add more widget types here
];

const CustomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pages, addWidgetToPage, removeWidgetFromPage, updatePageLayout } = useCustomPages();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWidgetTitle, setNewWidgetTitle] = useState('');
  const [selectedWidgetType, setSelectedWidgetType] = useState(WIDGET_TYPES[0].type);

  const page = pages.find(p => p.id === id);

  if (!page) {
    return <div>Page not found</div>;
  }

  const handleAddWidget = () => {
    if (newWidgetTitle.trim()) {
      addWidgetToPage(page.id, selectedWidgetType, newWidgetTitle);
      setIsDialogOpen(false);
      setNewWidgetTitle('');
      setSelectedWidgetType(WIDGET_TYPES[0].type);
    }
  };

  const handleLayoutChange = (layout: any) => {
    updatePageLayout(page.id, layout);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <h2>{page.title}</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Widget
        </Button>
      </Box>

      <GridLayout
        className="layout"
        layout={page.layout}
        cols={12}
        rowHeight={100}
        width={1200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={handleLayoutChange}
      >
        {page.widgets.map((widget) => (
          <div key={widget.id}>
            <ResizableWidget title={widget.title}>
              <Box sx={{ position: 'relative', height: '100%' }}>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                  onClick={() => removeWidgetFromPage(page.id, widget.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <div>{`${widget.type} Widget Content`}</div>
              </Box>
            </ResizableWidget>
          </div>
        ))}
      </GridLayout>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Widget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Widget Title"
            fullWidth
            value={newWidgetTitle}
            onChange={(e) => setNewWidgetTitle(e.target.value)}
          />
          <List>
            {WIDGET_TYPES.map((type) => (
              <ListItemButton
                key={type.type}
                selected={selectedWidgetType === type.type}
                onClick={() => setSelectedWidgetType(type.type)}
              >
                <ListItemText primary={type.label} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddWidget} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomPage; 