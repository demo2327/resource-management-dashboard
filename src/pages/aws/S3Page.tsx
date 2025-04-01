/**
 * S3 Buckets Management Page
 * 
 * This component implements a dedicated page for managing AWS S3 buckets.
 * It demonstrates several React and AWS integration patterns:
 * 
 * Technical Concepts:
 * 1. React Grid Layout for responsive widget positioning
 * 2. Custom hooks for layout persistence
 * 3. Reusable widget components
 * 4. AWS S3 data visualization
 */

import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import S3BucketsTable from '../../components/Tables/S3BucketsTable';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

/**
 * S3Page Component
 * 
 * Displays S3 bucket information in a resizable and draggable grid layout.
 * Uses persistent layout storage to maintain user customizations.
 * 
 * @component
 */
const S3Page: React.FC = () => {
  // Default grid layout configuration
  const defaultLayout: Layout[] = [
    { i: 'inventory', x: 0, y: 0, w: 12, h: 8 },
  ];

  // Use custom hook to persist layout changes
  const { layout, onLayoutChange } = usePersistedLayout('s3-page', defaultLayout);

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
        {/* S3 Buckets Inventory Widget */}
        <div key="inventory">
          <ResizableWidget title="S3 Buckets Inventory">
            <Box sx={{ width: '100%', height: '100%', p: 2 }}>
              <S3BucketsTable widgetId="s3-page-default" />
            </Box>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default S3Page; 