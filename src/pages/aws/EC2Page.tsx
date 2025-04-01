/**
 * EC2 Instances Management Page
 * 
 * This component implements a dedicated page for managing AWS EC2 instances.
 * It demonstrates several React and AWS integration patterns:
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. AWS EC2 instance monitoring
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * EC2Page Component
 * 
 * Displays EC2 instance information in a resizable and draggable grid layout.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * Features:
 * - Draggable and resizable widgets
 * - Persistent layout across sessions
 * - Real-time EC2 instance monitoring
 * 
 * @component
 */
const EC2Page: React.FC = () => {
  // Default grid layout configuration
  const defaultLayout: Layout[] = [
    { i: 'inventory', x: 0, y: 0, w: 12, h: 8 },
  ];

  // Use custom hook to persist layout changes
  const { layout, onLayoutChange } = usePersistedLayout('ec2-page', defaultLayout);

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
        {/* EC2 Instances Inventory Widget */}
        <div key="inventory">
          <ResizableWidget title="EC2 Instances Inventory">
            <div>EC2 Instances Inventory Content</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default EC2Page; 