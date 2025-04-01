import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import usePersistedLayout from '../../hooks/usePersistedLayout';
import S3BucketsTable from '../../components/Tables/S3BucketsTable';
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
        cols={20}
        rowHeight={100}
        width={2000}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={onLayoutChange}
      >
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