/**
 * Platform Information Page
 * 
 * This component implements a dedicated page for displaying platform-level information
 * and system metrics. It provides a flexible layout for various platform-related widgets.
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. Platform metrics visualization
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import usePersistedLayout from '../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * PlatformInfoPage Component
 * 
 * Displays platform information in a resizable and draggable grid layout.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * Features:
 * - Draggable and resizable widgets
 * - Persistent layout across sessions
 * - Platform metrics display
 * - System performance monitoring
 * 
 * @component
 */
const PlatformInfoPage: React.FC = () => {
  // Default grid layout configuration for platform info widgets
  const defaultLayout: Layout[] = [
    { i: 'widget1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'widget2', x: 6, y: 0, w: 6, h: 4 },
  ];

  // Use custom hook to persist layout changes across sessions
  const { layout, onLayoutChange } = usePersistedLayout('platform-info-page', defaultLayout);

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
        {/* Platform Information Widget 1 */}
        <div key="widget1">
          <ResizableWidget title="Platform Info Widget 1">
            <div>Platform Information Widget 1</div>
          </ResizableWidget>
        </div>
        {/* Platform Information Widget 2 */}
        <div key="widget2">
          <ResizableWidget title="Platform Info Widget 2">
            <div>Platform Information Widget 2</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default PlatformInfoPage; 