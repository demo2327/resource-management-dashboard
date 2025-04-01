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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import GridLayout from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import { useCustomPages } from '../context/CustomPagesContext';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import PieChartWidget from '../components/Widget/PieChartWidget';
import S3BucketsTable from '../components/Tables/S3BucketsTable';

// Define widget type as a union type
export type WidgetType = 'text' | 'inventory' | 'pie-chart' | 's3-buckets';

const WIDGET_TYPES = [
  { type: 'text' as WidgetType, label: 'Text Widget' },
  { type: 'inventory' as WidgetType, label: 'Inventory Widget' },
  { type: 'pie-chart' as WidgetType, label: 'Pie Chart' },
  { type: 's3-buckets' as WidgetType, label: 'S3 Buckets Table' }
] as const;

export interface Widget {
  id: string;
  title: string;
  type: WidgetType;
  isHeart?: boolean;
}

const CustomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pages, addWidgetToPage, removeWidgetFromPage, updatePageLayout, copyWidget } = useCustomPages();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWidgetTitle, setNewWidgetTitle] = useState('');
  const [selectedWidgetType, setSelectedWidgetType] = useState<WidgetType>('text');
  const [isHeartShape, setIsHeartShape] = useState(false);

  const page = pages.find(p => p.id === id);

  if (!page) {
    return <div>Page not found</div>;
  }

  const handleAddWidget = () => {
    if (newWidgetTitle.trim()) {
      addWidgetToPage(page.id, selectedWidgetType, newWidgetTitle, isHeartShape);
      setIsDialogOpen(false);
      setNewWidgetTitle('');
      setSelectedWidgetType('text');
      setIsHeartShape(false);
    }
  };

  const handleLayoutChange = (layout: any) => {
    updatePageLayout(page.id, layout);
  };

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
              isHeart={widget.isHeart}
            >
              {renderWidget(widget)}
            </ResizableWidget>
          </div>
        ))}
      </GridLayout>

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
    </Box>
  );
};

export default CustomPage; 