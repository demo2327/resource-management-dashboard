/**
 * Resizable Widget Component
 * 
 * This component implements a flexible container for dashboard widgets with resizing,
 * dragging, and customization capabilities. It provides a consistent look and feel
 * across different widget types.
 * 
 * Technical Concepts:
 * 1. Material-UI Paper component for elevation and styling
 * 2. Custom title editing functionality
 * 3. Widget control management (copy, delete)
 * 4. Heart-shaped widget variant support
 */

import React, { useState } from 'react';
import { Paper, Typography, IconButton, Box, TextField } from '@mui/material';
import { ContentCopy as CopyIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

/**
 * ResizableWidgetProps Interface
 * 
 * Defines the props for the ResizableWidget component.
 * Includes title, content, and various control callbacks.
 */
interface ResizableWidgetProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onCopy?: () => void;
  onDelete?: () => void;
  onTitleChange?: (newTitle: string) => void;
  showControls?: boolean;
  isHeart?: boolean;
}

/**
 * ResizableWidget Component
 * 
 * A container component for dashboard widgets with resizing and customization capabilities.
 * 
 * Features:
 * - Resizable and draggable container
 * - Editable widget title
 * - Copy and delete controls
 * - Heart-shaped variant support
 * - Persistent layout management
 * 
 * @component
 * @param {ResizableWidgetProps} props - Component props
 */
const ResizableWidget: React.FC<ResizableWidgetProps> = ({ 
  title, 
  children, 
  className,
  onCopy,
  onDelete,
  onTitleChange,
  showControls = false,
  isHeart = false
}) => {
  const location = useLocation();
  const isCustomPage = location.pathname.startsWith('/custom/');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  /**
   * Handles the copy action for the widget
   * @param e - Mouse event
   */
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCopy) {
      onCopy();
    }
  };

  /**
   * Handles the delete action for the widget
   * @param e - Mouse event
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  /**
   * Initiates title editing mode
   * @param e - Mouse event
   */
  const handleTitleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCustomPage && showControls) {
      setEditedTitle(title);
      setIsEditingTitle(true);
    }
  };

  /**
   * Saves the edited title
   */
  const handleTitleSave = () => {
    if (editedTitle.trim() && onTitleChange) {
      onTitleChange(editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  /**
   * Handles keyboard events during title editing
   * @param e - Keyboard event
   */
  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setIsEditingTitle(false);
      setEditedTitle(title);
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
      {/* Heart shape SVG definition */}
      {isHeart && (
        <svg width="0" height="0">
          <defs>
            <clipPath id="heart" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.15 C0.4,0.1 0.25,0.05 0.15,0.05 C0.05,0.05 0,0.15 0,0.3 C0,0.4 0.1,0.5 0.2,0.6 C0.3,0.7 0.4,0.8 0.5,0.9 C0.6,0.8 0.7,0.7 0.8,0.6 C0.9,0.5 1,0.4 1,0.3 C1,0.15 0.95,0.05 0.85,0.05 C0.75,0.05 0.6,0.1 0.5,0.15Z" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Widget Header */}
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
        {/* Title or Title Editor */}
        {isEditingTitle ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            size="small"
            sx={{ 
              '& .MuiInputBase-input': {
                fontSize: '1.1rem',
                fontWeight: 500,
                py: 0.5,
                px: 1,
              }
            }}
          />
        ) : (
          <Typography 
            variant="h6" 
            onClick={handleTitleEdit}
            onMouseDown={(e) => e.stopPropagation()}
            sx={{
              ...(isHeart && {
                fontSize: '1.1rem',
                maxWidth: '70%'
              }),
              ...(isCustomPage && showControls && {
                cursor: 'pointer',
                userSelect: 'none',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderRadius: 1,
                  px: 1,
                  mx: -1
                },
                px: 1,
                mx: -1
              })
            }}
          >
            {title}
          </Typography>
        )}

        {/* Widget Controls */}
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
              onMouseDown={(e) => e.stopPropagation()}
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
              onMouseDown={(e) => e.stopPropagation()}
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

      {/* Widget Content */}
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