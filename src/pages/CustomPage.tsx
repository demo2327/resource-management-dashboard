/**
 * Custom Dashboard Page Component
 * 
 * This component implements a flexible dashboard page with draggable and resizable widgets.
 * It demonstrates several advanced React and TypeScript concepts:
 * 
 * Technical Concepts:
 * 1. React Grid Layout for widget positioning and resizing
 * 2. Dynamic component rendering based on widget types
 * 3. Custom context integration for state management
 * 4. TypeScript type definitions and interfaces
 * 5. Material-UI components and styling
 * 
 * Code Maintenance Guidelines:
 * 1. Keep all comments up-to-date with code changes
 * 2. Update component documentation when adding new features
 * 3. Document any changes to the component's structure or behavior
 * 4. Maintain consistent comment formatting and style
 */

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
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Share as ShareIcon } from '@mui/icons-material';
import { parse, stringify } from 'yaml';
import GridLayout from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import { useCustomPages } from '../context/CustomPagesContext';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import PieChartWidget from '../components/Widget/PieChartWidget';
import S3BucketsTable from '../components/Tables/S3BucketsTable';

/**
 * Widget Type Definition
 * 
 * Defines the available types of widgets that can be added to the dashboard
 * Each type corresponds to a specific widget component
 */
export type WidgetType = 'text' | 'inventory' | 'pie-chart' | 's3-buckets';

/**
 * Available widget types with their display labels
 * Used in the widget selection dialog
 */
const WIDGET_TYPES = [
  { type: 'text' as WidgetType, label: 'Text Widget' },
  { type: 'inventory' as WidgetType, label: 'Inventory Widget' },
  { type: 'pie-chart' as WidgetType, label: 'Pie Chart' },
  { type: 's3-buckets' as WidgetType, label: 'S3 Buckets' }
] as const;

/**
 * Widget Interface
 * 
 * Defines the structure of a widget object
 * @property {string} id - Unique identifier for the widget
 * @property {string} title - Display title of the widget
 * @property {WidgetType} type - Type of widget (determines rendered content)
 * @property {boolean} [isHeart] - Optional flag for heart-shaped styling
 */
export interface Widget {
  id: string;
  title: string;
  type: WidgetType;
  isHeart?: boolean;
}

/**
 * CustomPage Component
 * 
 * A dynamic dashboard page that allows users to:
 * - Add/remove widgets of different types
 * - Drag and resize widgets
 * - Edit page and widget titles
 * - Copy existing widgets
 * 
 * @component
 */
const CustomPage: React.FC = () => {
  // Get page ID from URL parameters
  const { id } = useParams<{ id: string }>();
  
  // Access custom pages context for state management
  const { 
    pages, 
    addWidgetToPage, 
    removeWidgetFromPage, 
    updatePageLayout, 
    copyWidget, 
    updatePageTitle,
    updateWidgetTitle
  } = useCustomPages();

  // Local state for managing the UI
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWidgetTitle, setNewWidgetTitle] = useState('');
  const [selectedWidgetType, setSelectedWidgetType] = useState<WidgetType>('text');
  const [isHeartShape, setIsHeartShape] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Find the current page from the pages array
  const page = pages.find(p => p.id === id);

  if (!page) {
    return <div>Page not found</div>;
  }

  /**
   * Initiates page title editing
   * Sets up the editing state with current title
   */
  const handleTitleEdit = () => {
    setEditedTitle(page.title);
    setIsEditingTitle(true);
  };

  /**
   * Saves the edited page title
   * Updates the title if it's not empty
   */
  const handleTitleSave = () => {
    if (editedTitle.trim()) {
      updatePageTitle(page.id, editedTitle.trim());
      setIsEditingTitle(false);
    }
  };

  /**
   * Handles keyboard events during title editing
   * Enter: Save changes
   * Escape: Cancel editing
   */
  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setEditedTitle(page.title);
    }
  };

  /**
   * Handles adding a new widget to the page
   * Creates widget with specified title, type, and shape
   */
  const handleAddWidget = () => {
    if (newWidgetTitle.trim()) {
      addWidgetToPage(page.id, selectedWidgetType, newWidgetTitle, isHeartShape);
      setIsDialogOpen(false);
      setNewWidgetTitle('');
      setSelectedWidgetType('text');
      setIsHeartShape(false);
    }
  };

  /**
   * Updates the layout when widgets are moved or resized
   * @param {Layout[]} layout - New layout configuration from react-grid-layout
   */
  const handleLayoutChange = (layout: any) => {
    updatePageLayout(page.id, layout);
  };

  /**
   * Renders the appropriate widget content based on widget type
   * @param {Widget} widget - The widget object to render
   * @returns {JSX.Element | null} The rendered widget content
   */
  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'text':
        return <div>Text Widget Content</div>;
      case 'inventory':
        return <div>Inventory Widget Content</div>;
      case 'pie-chart':
        return <PieChartWidget />;
      case 's3-buckets':
        return <Box sx={{ width: '100%', height: '100%', p: 2 }}><S3BucketsTable widgetId={widget.id} /></Box>;
      default:
        return null;
    }
  };

  /**
   * Handles sharing the page configuration
   * Displays a dialog with the YAML configuration
   */
  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  /**
   * Generates a YAML configuration with comments explaining the structure
   */
  const generateYamlConfig = () => {
    const config = {
      title: page.title,
      widgets: page.widgets,
      layout: page.layout
    };

    // Add comments to explain the configuration
    const yamlWithComments = `# Custom Page Configuration
# This YAML file contains the complete configuration for a custom dashboard page
# You can use this configuration to recreate the page layout and widgets

# Page title that will be displayed in the header
title: ${page.title}

# List of widgets on the page
# Each widget has:
# - id: Unique identifier (will be regenerated on import)
# - title: Display title of the widget
# - type: Type of widget (text, inventory, pie-chart, or s3-buckets)
# - isHeart: Optional flag for heart-shaped styling
widgets:
${stringify(config.widgets, { indent: 2 })}

# Layout configuration for widget positioning
# Each layout item has:
# - i: Widget ID (matching the widget.id above)
# - x: Horizontal position (0-19)
# - y: Vertical position (in grid units)
# - w: Width (in grid units)
# - h: Height (in grid units)
layout:
${stringify(config.layout, { indent: 2 })}`;

    return yamlWithComments;
  };

  /**
   * Handles importing a page configuration
   * Validates and processes the YAML input
   */
  const handleImport = () => {
    try {
      const config = parse(importJson);
      // Validate required fields
      if (!config.title || !Array.isArray(config.widgets) || !Array.isArray(config.layout)) {
        throw new Error('Invalid page configuration: missing required fields');
      }
      setIsImportDialogOpen(false);
      setImportJson('');
      setError(null);
    } catch (error) {
      console.error('Invalid YAML configuration:', error);
      setError(error instanceof Error ? error.message : 'Invalid YAML configuration');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Page Header Bar
       * A sticky header bar that contains:
       * - Editable page title
       * - Add Widget button
       * Styled to match Material-UI AppBar height and appearance
       */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        px: 3,
        py: 1.5,
        backgroundColor: 'action.hover',
        borderBottom: 1,
        borderColor: 'divider',
        height: '64px', // Standard Material-UI AppBar height
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}>
        {isEditingTitle ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            size="small"
            sx={{ 
              '& .MuiInputBase-input': {
                fontSize: 'h6.fontSize',
                fontWeight: 'h6.fontWeight',
              }
            }}
          />
        ) : (
          <Box 
            component="h2" 
            onClick={handleTitleEdit}
            sx={{ 
              cursor: 'pointer', 
              '&:hover': { 
                backgroundColor: 'action.selected',
                borderRadius: 1,
                px: 1,
                mx: -1
              },
              display: 'inline-block',
              px: 1,
              mx: -1,
              fontSize: 'h6.fontSize',
              fontWeight: 'h6.fontWeight'
            }}
          >
            {page.title}
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleShare}
            size="small"
          >
            Share
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
            size="small"
          >
            Add Widget
          </Button>
        </Box>
      </Box>

      {/* Main Content Area
       * Contains the grid layout for widgets with proper padding
       */}
      <Box sx={{ p: 3 }}>
        <GridLayout
          className="layout"
          layout={page.layout}
          cols={20}
          rowHeight={100}
          width={2000}
          isDraggable={true}
          isResizable={true}
          onLayoutChange={handleLayoutChange}
        >
          {page.widgets.map((widget) => (
            <div key={widget.id}>
              <ResizableWidget 
                title={widget.title}
                showControls={true}
                onCopy={() => copyWidget(page.id, widget.id)}
                onDelete={() => removeWidgetFromPage(page.id, widget.id)}
                onTitleChange={(newTitle) => updateWidgetTitle(page.id, widget.id, newTitle)}
                isHeart={widget.isHeart}
              >
                {renderWidget(widget)}
              </ResizableWidget>
            </div>
          ))}
        </GridLayout>
      </Box>

      {/* Share Configuration Dialog */}
      <Dialog
        open={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Share Page Configuration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Copy this configuration to share your page layout:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={15}
            value={generateYamlConfig()}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsShareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Import Configuration Dialog */}
      <Dialog
        open={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Import Page Configuration</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsImportDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleImport} 
            variant="contained"
            disabled={!isValidYaml(importJson)}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Widget Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Widget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Widget Title"
            fullWidth
            value={newWidgetTitle}
            onChange={(e) => setNewWidgetTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <List sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
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
          <FormControlLabel
            control={
              <Switch
                checked={isHeartShape}
                onChange={(e) => setIsHeartShape(e.target.checked)}
                color="primary"
              />
            }
            label="Heart Shape"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddWidget} variant="contained" color="primary">
            Add
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
    </Box>
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

export default CustomPage; 