import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import usePersistedLayout from '../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const PlatformInfoPage: React.FC = () => {
  const defaultLayout: Layout[] = [
    { i: 'widget1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'widget2', x: 6, y: 0, w: 6, h: 4 },
  ];

  const { layout, onLayoutChange } = usePersistedLayout('platform-info-page', defaultLayout);

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
        <div key="widget1">
          <ResizableWidget title="Platform Info Widget 1">
            <div>Platform Information Widget 1</div>
          </ResizableWidget>
        </div>
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