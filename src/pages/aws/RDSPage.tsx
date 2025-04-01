/**
 * AWS RDS (Relational Database Service) Management Page
 * 
 * This component implements a dedicated page for managing AWS RDS resources.
 * It provides a visual interface for monitoring database instances, clusters,
 * and their associated metrics.
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. AWS RDS database monitoring
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * RDSPage Component
 * 
 * Displays RDS resource information in a resizable and draggable grid layout.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * Features:
 * - Draggable and resizable widgets
 * - Persistent layout across sessions
 * - Real-time RDS resource monitoring
 * - Database instance metrics
 * - Cluster performance insights
 * 
 * @component
 */
const RDSPage: React.FC = () => {
  // Default grid layout configuration for RDS clusters inventory widget
  const defaultLayout: Layout[] = [
    { i: 'inventory', x: 0, y: 0, w: 12, h: 8 },
  ];

  // Use custom hook to persist layout changes across sessions
  const { layout, onLayoutChange } = usePersistedLayout('rds-page', defaultLayout);

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
        {/* RDS Clusters Inventory Widget */}
        <div key="inventory">
          <ResizableWidget title="RDS Clusters Inventory">
            <div>RDS Clusters Inventory Content</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default RDSPage; 