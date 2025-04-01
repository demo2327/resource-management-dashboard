/**
 * Application Information Page
 * 
 * This component implements a dedicated page for displaying application-level information
 * and metrics. It provides a flexible layout for various application-related widgets.
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. Application metrics visualization
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import usePersistedLayout from '../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * AppInfoPage Component
 * 
 * Displays application information in a resizable and draggable grid layout.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * Features:
 * - Draggable and resizable widgets
 * - Persistent layout across sessions
 * - Application metrics display
 * - System health monitoring
 * 
 * @component
 */
const AppInfoPage: React.FC = () => {
  // Default grid layout configuration for application info widgets
  const defaultLayout: Layout[] = [
    { i: 'widget1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'widget2', x: 6, y: 0, w: 6, h: 4 },
  ];

  // Use custom hook to persist layout changes across sessions
  const { layout, onLayoutChange } = usePersistedLayout('app-info-page', defaultLayout);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Grid Layout Container */}
      <GridLayout
        className="layout"
        layout={layout}
        cols={20}
        rowHeight={100}
        width={2000}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={onLayoutChange}
      >
        {/* Application Information Widget 1 */}
        <div key="widget1">
          <ResizableWidget title="App Info Widget 1">
            <div>Application Information Widget 1</div>
          </ResizableWidget>
        </div>
        {/* Application Information Widget 2 */}
        <div key="widget2">
          <ResizableWidget title="App Info Widget 2">
            <div>Application Information Widget 2</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default AppInfoPage; 