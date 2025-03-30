import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../components/Widget/ResizableWidget';
import usePersistedLayout from '../hooks/usePersistedLayout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const EntryPage: React.FC = () => {
  const defaultLayout: Layout[] = [
    { i: 'widget1', x: 0, y: 0, w: 10, h: 4 },
    { i: 'widget2', x: 10, y: 0, w: 10, h: 4 },
  ];

  const { layout, onLayoutChange } = usePersistedLayout('entry-page', defaultLayout);

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
          <ResizableWidget title="Entry Widget 1">
            <div>Widget 1 Content</div>
          </ResizableWidget>
        </div>
        <div key="widget2">
          <ResizableWidget title="Entry Widget 2">
            <div>Widget 2 Content</div>
          </ResizableWidget>
        </div>
      </GridLayout>
    </Box>
  );
};

export default EntryPage; 