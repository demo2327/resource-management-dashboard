import React from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import { ContentCopy as CopyIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

interface ResizableWidgetProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onCopy?: () => void;
  onDelete?: () => void;
  showControls?: boolean;
  isHeart?: boolean;
}

const ResizableWidget: React.FC<ResizableWidgetProps> = ({ 
  title, 
  children, 
  className,
  onCopy,
  onDelete,
  showControls = false,
  isHeart = false
}) => {
  const location = useLocation();
  const isCustomPage = location.pathname.startsWith('/custom/');

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCopy) {
      onCopy();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Paper
      className={className}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        position: 'relative',
        ...(isHeart ? {
          clipPath: 'url(#heart)',
          background: (theme) => theme.palette.background.paper,
          boxShadow: 2,
          p: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'inherit',
            zIndex: -1
          }
        } : {
          p: 2
        })
      }}
    >
      {isHeart && (
        <svg width="0" height="0">
          <defs>
            <clipPath id="heart" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.15 C0.4,0.1 0.25,0.05 0.15,0.05 C0.05,0.05 0,0.15 0,0.3 C0,0.4 0.1,0.5 0.2,0.6 C0.3,0.7 0.4,0.8 0.5,0.9 C0.6,0.8 0.7,0.7 0.8,0.6 C0.9,0.5 1,0.4 1,0.3 C1,0.15 0.95,0.05 0.85,0.05 C0.75,0.05 0.6,0.1 0.5,0.15Z" />
            </clipPath>
          </defs>
        </svg>
      )}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        ...(isHeart ? {
          pt: 4,
          px: 4,
          mb: 2
        } : {
          mb: 1
        })
      }}>
        <Typography 
          variant="h6" 
          sx={{
            ...(isHeart && {
              fontSize: '1.1rem',
              maxWidth: '70%'
            })
          }}
        >
          {title}
        </Typography>
        {isCustomPage && showControls && (
          <Box sx={{ 
            position: 'absolute',
            display: 'flex',
            zIndex: 1,
            ...(isHeart ? {
              top: '1rem',
              right: '1.5rem'
            } : {
              top: 0,
              right: 0
            })
          }}>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{ 
                mr: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDelete}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        ...(isHeart ? {
          px: 4,
          pb: 6,
          pt: 1
        } : {
          p: 0
        })
      }}>
        {children}
      </Box>
    </Paper>
  );
};

export default ResizableWidget; 