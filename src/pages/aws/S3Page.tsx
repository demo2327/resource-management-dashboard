import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const S3Page: React.FC = () => {
  const defaultLayout: Layout[] = [
    { i: 'inventory', x: 0, y: 0, w: 12, h: 8 },
  ];

  const { layout, onLayoutChange } = usePersistedLayout('s3-page', defaultLayout);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={onLayoutChange}
      >
        <div key="inventory">
          <ResizableWidget title="S3 Buckets Inventory">
            <div>S3 Buckets Inventory Content</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default S3Page; 