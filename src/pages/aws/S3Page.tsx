import React from 'react';
import { Box } from '@mui/material';
import ResizableWidget from '../../components/Widget/ResizableWidget';
import S3BucketsTable from '../../components/Tables/S3BucketsTable';

const S3Page: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <ResizableWidget title="S3 Buckets Inventory">
        <Box sx={{ width: '100%', height: '100%', p: 2 }}>
          <S3BucketsTable />
        </Box>
      </ResizableWidget>
    </Box>
  );
};

export default S3Page; 