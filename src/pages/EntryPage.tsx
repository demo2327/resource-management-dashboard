/**
 * Entry Point Page
 * 
 * This component serves as the main entry point for the application,
 * providing a customizable dashboard layout for key metrics and information.
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. Dashboard-style layout management
 * 5. Sticky header bar with consistent styling
 * 
 * Layout Structure:
 * - Sticky header bar with page title
 * - Main content area with grid layout
 * - Resizable and draggable widgets
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import usePersistedLayout from '../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * EntryPage Component
 * 
 * Displays the main dashboard layout with resizable and draggable widgets.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * Features:
 * - Sticky header bar with consistent styling
 * - Draggable and resizable widgets
 * - Persistent layout across sessions
 * - Key metrics display
 * - Quick access to important information
 * 
 * @component
 */
const EntryPage: React.FC = () => {
  // Default grid layout configuration for entry point widgets
  const defaultLayout: Layout[] = [
    { i: 'widget1', x: 0, y: 0, w: 10, h: 4 },
    { i: 'widget2', x: 10, y: 0, w: 10, h: 4 },
  ];

  // Use custom hook to persist layout changes across sessions
  const { layout, onLayoutChange } = usePersistedLayout('entry-page', defaultLayout);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Page Header Bar
       * A sticky header bar that contains:
       * - Page title
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
        <Box 
          component="h2" 
          sx={{ 
            fontSize: 'h6.fontSize',
            fontWeight: 'h6.fontWeight'
          }}
        >
          Dashboard
        </Box>
      </Box>

      {/* Main Content Area
       * Contains the grid layout for widgets with proper padding
       */}
      <Box sx={{ p: 3 }}>
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
          {/* Entry Point Widget 1 */}
          <div key="widget1">
            <ResizableWidget title="Entry Widget 1">
              <div>Widget 1 Content</div>
            </ResizableWidget>
          </div>
          {/* Entry Point Widget 2 */}
          <div key="widget2">
            <ResizableWidget title="Entry Widget 2">
              <div>Widget 2 Content</div>
            </ResizableWidget>
          </div>
        </GridLayout>
      </Box>
    </Box>
  );
};

export default EntryPage; 