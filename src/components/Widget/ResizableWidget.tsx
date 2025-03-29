import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ResizableWidgetProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const ResizableWidget: React.FC<ResizableWidgetProps> = ({ title, children, className }) => {
  return (
    <Paper
      className={className}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </Paper>
  );
};

export default ResizableWidget; 