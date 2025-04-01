/**
 * AWS VPC (Virtual Private Cloud) Management Page
 * 
 * This component implements a dedicated page for managing AWS VPC resources.
 * It provides a visual interface for monitoring VPCs, subnets, route tables,
 * and network configurations.
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. AWS VPC network monitoring
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * VPCPage Component
 * 
 * Displays VPC resource information in a resizable and draggable grid layout.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * Features:
 * - Draggable and resizable widgets
 * - Persistent layout across sessions
 * - Real-time VPC resource monitoring
 * - Network configuration insights
 * - Subnet and routing visualization
 * 
 * @component
 */
const VPCPage: React.FC = () => {
  // Default grid layout configuration for VPC inventory widget
  const defaultLayout: Layout[] = [
    { i: 'inventory', x: 0, y: 0, w: 12, h: 8 },
  ];

  // Use custom hook to persist layout changes across sessions
  const { layout, onLayoutChange } = usePersistedLayout('vpc-page', defaultLayout);

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
        {/* VPC Resource Inventory Widget */}
        <div key="inventory">
          <ResizableWidget title="VPC Inventory">
            <div>VPC Inventory Content</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default VPCPage; 