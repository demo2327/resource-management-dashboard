import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ECSPage: React.FC = () => {
  const defaultLayout: Layout[] = [
    { i: 'inventory', x: 0, y: 0, w: 12, h: 8 },
  ];

  const { layout, onLayoutChange } = usePersistedLayout('ecs-page', defaultLayout);

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
        <div key="inventory">
          <ResizableWidget title="ECS Inventory">
            <div>ECS Inventory Content</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default ECSPage; 