import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import usePersistedLayout from '../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const AwsInventoryPage: React.FC = () => {
  const defaultLayout: Layout[] = [
    { i: 'widget1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'widget2', x: 6, y: 0, w: 6, h: 4 },
  ];

  const { layout, onLayoutChange } = usePersistedLayout('aws-inventory-page', defaultLayout);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
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
        <div key="widget1">
          <ResizableWidget title="AWS Resource Widget 1">
            <div>AWS Resource Information Widget 1</div>
          </ResizableWidget>
        </div>
        <div key="widget2">
          <ResizableWidget title="AWS Resource Widget 2">
            <div>AWS Resource Information Widget 2</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default AwsInventoryPage; 