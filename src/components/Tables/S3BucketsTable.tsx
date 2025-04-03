/**
 * AWS S3 Buckets Table Component
 * 
 * This component implements a sophisticated data grid for displaying and managing AWS S3 buckets.
 * It provides advanced filtering, sorting, and visualization capabilities for S3 bucket data.
 * 
 * Technical Concepts:
 * 1. Material-UI DataGrid for advanced table functionality
 * 2. Custom filtering system with drag-and-drop support
 * 3. Persistent filter state management
 * 4. AWS S3 data visualization and management
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridSortModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Box,
  Link,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  DeleteForever as TrashIcon,
} from '@mui/icons-material';
import s3InventoryData from '../../data/s3Inventory.json';

/**
 * LifecycleRule Interface
 * 
 * Defines the structure of S3 bucket lifecycle rules.
 * Contains configuration for object transitions, expirations, and versioning.
 */
interface LifecycleRule {
  AbortIncompleteMultipartUpload: number;
  Expiration: number;
  LifecycleRule: string;
  NoncurrentVersionExpiration: number;
  NoncurrentVersionTransitionsDays: number;
  NoncurrentVersionTransitionsStorage: string;
  Status: string;
  TransitionDays: number;
  TransitionStorage: string;
}

/**
 * S3Bucket Interface
 * 
 * Represents an AWS S3 bucket with its attributes and relationships.
 * Includes metadata such as name, region, size, and lifecycle rules.
 */
interface S3Bucket {
  type: string;
  id: string;
  attributes: {
    lifecycle: LifecycleRule[];
    Name: string;
    Region: string;
    SizeBytes: number;
    WeeklyGrow: number;
  };
  relationships: {
    Account: {
      data: {
        id: string;
        type: string;
        name: string;
      };
    };
  };
}

/**
 * Helper function to format byte sizes into human-readable format
 * @param bytes - The number of bytes to format
 * @returns Formatted string with appropriate unit (Bytes, KB, MB, GB, TB)
 */
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Column definitions for the S3 buckets data grid
 * Includes formatting, sorting, and custom rendering for each column
 */
const columns: GridColDef[] = [
  { 
    field: 'name', 
    headerName: 'Bucket Name', 
    width: 200,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).attributes.Name,
    renderCell: (params: GridRenderCellParams) => {
      const bucketName = (params.row as S3Bucket).attributes.Name;
      const consoleUrl = `https://s3.console.aws.amazon.com/s3/buckets/${bucketName}`;
      return (
        <Link 
          href={consoleUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
        >
          {bucketName}
        </Link>
      );
    },
  },
  { 
    field: 'account', 
    headerName: 'Account', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).relationships.Account.data.name,
  },
  { 
    field: 'accountId', 
    headerName: 'Account ID', 
    width: 150,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).relationships.Account.data.id,
  },
  { 
    field: 'region', 
    headerName: 'Region', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).attributes.Region,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 130,
    valueGetter: (params: GridValueGetterParams) => formatBytes((params.row as S3Bucket).attributes.SizeBytes),
    sortComparator: (v1: string, v2: string) => {
      const size1 = parseFloat(v1.split(' ')[0]);
      const size2 = parseFloat(v2.split(' ')[0]);
      return size1 - size2;
    },
  },
  {
    field: 'weeklyGrowth',
    headerName: 'Weekly Growth',
    width: 130,
    valueGetter: (params: GridValueGetterParams) => formatBytes((params.row as S3Bucket).attributes.WeeklyGrow),
  },
  {
    field: 'lifecycleRule',
    headerName: 'Lifecycle Rule',
    width: 200,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).attributes.lifecycle[0]?.LifecycleRule || 'N/A',
  },
  {
    field: 'lifecycleStatus',
    headerName: 'Status',
    width: 130,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).attributes.lifecycle[0]?.Status || 'N/A',
  },
  {
    field: 'storageClass',
    headerName: 'Storage Class',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => (params.row as S3Bucket).attributes.lifecycle[0]?.TransitionStorage || 'STANDARD',
  },
];

/**
 * Filter-related interfaces for the custom filtering system
 */
interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface FilterCondition {
  id: string;
  type: 'filter' | 'group';
  operator?: 'AND' | 'OR';
  filter?: Filter;
  children?: FilterCondition[];
}

/**
 * Available operators for the filtering system
 */
const operators = {
  contains: 'contains',
  equals: 'equals',
  startsWith: 'starts with',
  endsWith: 'ends with',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
};

/**
 * FilterElement Interface
 * 
 * Represents a single element in the filter expression builder.
 * Can be a filter condition, operator, or parenthesis.
 */
interface FilterElement {
  id: string;
  type: 'filter' | 'operator' | 'parenthesis';
  value: string;
  filter?: {
    field: string;
    operator: string;
    value: string;
  };
  parenthesisType?: 'open' | 'close';
}

interface S3BucketsTableProps {
  widgetId: string;
}

/**
 * S3BucketsTable Component
 * 
 * Displays AWS S3 buckets in a feature-rich data grid with advanced filtering capabilities.
 * 
 * Features:
 * - Sortable and filterable columns
 * - Custom filter builder with drag-and-drop support
 * - Persistent filter state
 * - AWS S3 console integration
 * - Size and growth metrics visualization
 * 
 * @component
 * @param {S3BucketsTableProps} props - Component props
 */
const S3BucketsTable: React.FC<S3BucketsTableProps> = ({ widgetId }) => {
  const [filterElements, setFilterElements] = useState<FilterElement[]>(() => {
    const saved = localStorage.getItem(`s3-buckets-filters-${widgetId}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({
    field: 'name',
    operator: 'contains',
    value: '',
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [pageSize, setPageSize] = useState(5); // Default page size

  useEffect(() => {
    localStorage.setItem(`s3-buckets-filters-${widgetId}`, JSON.stringify(filterElements));
  }, [filterElements, widgetId]);

  const handleAddFilter = () => {
    if (currentFilter.value || currentFilter.operator === 'isEmpty' || currentFilter.operator === 'isNotEmpty') {
      const newFilter: FilterElement = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'filter',
        value: `${currentFilter.field} ${currentFilter.operator} ${currentFilter.value}`,
        filter: { ...currentFilter },
      };
      setFilterElements([...filterElements, newFilter]);
      setCurrentFilter({
        field: 'name',
        operator: 'contains',
        value: '',
      });
    }
  };

  const handleAddOperator = (operator: 'AND' | 'OR') => {
    const newOperator: FilterElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'operator',
      value: operator,
    };
    setFilterElements([...filterElements, newOperator]);
  };

  const handleAddParenthesis = (type: 'open' | 'close') => {
    const newParenthesis: FilterElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'parenthesis',
      value: type === 'open' ? '(' : ')',
      parenthesisType: type,
    };
    setFilterElements([...filterElements, newParenthesis]);
  };

  const handleRemoveElement = (id: string) => {
    setFilterElements(filterElements.filter(element => element.id !== id));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (dragIndex === dropIndex) return;

    const items = Array.from(filterElements);
    const [draggedItem] = items.splice(dragIndex, 1);
    items.splice(dropIndex, 0, draggedItem);
    setFilterElements(items);
  };

  const handleTrashDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleTrashDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleTrashDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const items = Array.from(filterElements);
    items.splice(dragIndex, 1);
    setFilterElements(items);
    setIsDraggingOver(false);
  };

  const evaluateFilterExpression = (row: S3Bucket): boolean => {
    // Convert the filter elements array to a string expression
    const expression = filterElements.map(element => {
      if (element.type === 'filter' && element.filter) {
        const value = (() => {
          switch (element.filter.field) {
            case 'name':
              return row.attributes.Name;
            case 'account':
              return row.relationships.Account.data.name;
            case 'accountId':
              return row.relationships.Account.data.id;
            case 'region':
              return row.attributes.Region;
            case 'size':
              return formatBytes(row.attributes.SizeBytes);
            case 'weeklyGrowth':
              return formatBytes(row.attributes.WeeklyGrow);
            case 'lifecycleRule':
              return row.attributes.lifecycle[0]?.LifecycleRule || 'N/A';
            case 'lifecycleStatus':
              return row.attributes.lifecycle[0]?.Status || 'N/A';
            case 'storageClass':
              return row.attributes.lifecycle[0]?.TransitionStorage || 'STANDARD';
            default:
              return '';
          }
        })();

        switch (element.filter.operator) {
          case 'contains':
            return value.toLowerCase().includes(element.filter.value.toLowerCase());
          case 'equals':
            return value.toLowerCase() === element.filter.value.toLowerCase();
          case 'startsWith':
            return value.toLowerCase().startsWith(element.filter.value.toLowerCase());
          case 'endsWith':
            return value.toLowerCase().endsWith(element.filter.value.toLowerCase());
          case 'isEmpty':
            return !value || value === 'N/A';
          case 'isNotEmpty':
            return Boolean(value && value !== 'N/A');
          default:
            return true;
        }
      }
      return element.value;
    });

    try {
      // Convert the expression array to a boolean expression and evaluate it
      let evalString = '';
      expression.forEach((value, index) => {
        if (typeof value === 'boolean') {
          evalString += value ? 'true' : 'false';
        } else if (value === 'AND') {
          evalString += '&&';
        } else if (value === 'OR') {
          evalString += '||';
        } else if (value === '(' || value === ')') {
          evalString += value;
        }
      });
      
      return new Function(`return ${evalString}`)();
    } catch (error) {
      console.error('Invalid filter expression');
      return true;
    }
  };

  const filteredRows = useMemo(() => {
    if (filterElements.length === 0) return s3InventoryData.data;
    return s3InventoryData.data.filter(evaluateFilterExpression);
  }, [filterElements]);

  const renderReadOnlyFilter = (element: FilterElement) => (
    <Chip
      key={element.id}
      label={element.value}
      size="small"
      color={element.type === 'operator' || element.type === 'parenthesis' ? 'primary' : 'default'}
      sx={{ 
        m: 0.1,
        ...(element.type === 'parenthesis' && {
          fontWeight: 'bold',
          fontSize: '1.1rem',
        })
      }}
    />
  );

  const renderDraggableFilter = (element: FilterElement, index: number) => (
    <Box
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
      sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        m: 0.25,
      }}
    >
      {element.type === 'filter' ? (
        <Chip
          label={element.value}
          sx={{ mr: 0.5 }}
        />
      ) : (
        <Chip
          label={element.value}
          color={element.type === 'operator' || element.type === 'parenthesis' ? 'primary' : 'default'}
          sx={{ 
            mr: 0.5,
            ...(element.type === 'parenthesis' && {
              fontWeight: 'bold',
              fontSize: '1.1rem',
            })
          }}
        />
      )}
    </Box>
  );

  const TrashZone = () => (
    <Box
      onDragOver={handleTrashDragOver}
      onDragLeave={handleTrashDragLeave}
      onDrop={handleTrashDrop}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        border: '2px dashed',
        borderColor: isDraggingOver ? 'error.main' : 'divider',
        borderRadius: 1,
        backgroundColor: isDraggingOver ? 'error.light' : 'background.default',
        transition: 'all 0.2s ease',
        opacity: isDraggingOver ? 0.9 : 0.7,
        cursor: 'default',
      }}
    >
      <TrashIcon color={isDraggingOver ? 'error' : 'action'} />
      <Typography
        variant="body2"
        color={isDraggingOver ? 'error' : 'text.secondary'}
        sx={{ ml: 1 }}
      >
        Drag here to remove
      </Typography>
    </Box>
  );

  const FilterContainer = ({ children, isEditable = false }: { children: React.ReactNode, isEditable?: boolean }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: isEditable ? 2 : 0.5 }}>
      <Box
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          minHeight: isEditable ? '40px' : 'auto',
          gap: 0.25,
          flex: 1,
        }}
      >
        {children}
      </Box>
      {isEditable && <TrashZone />}
    </Box>
  );

  const CustomToolbar = () => (
    <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1 }}>
        <GridToolbar 
          sx={{
            '& .MuiButton-root[aria-label="Show filters"]': {
              display: 'none',
            },
          }}
        />
        <Button
          startIcon={<FilterListIcon />}
          onClick={() => setIsFilterDialogOpen(true)}
          variant="outlined"
          size="small"
        >
          Custom Filters
        </Button>
        <Button
          startIcon={<RefreshIcon />}
          onClick={() => setRefreshKey(prev => prev + 1)}
          variant="outlined"
          size="small"
        >
          Refresh
        </Button>
        {filterElements.length > 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              backgroundColor: 'background.default',
              borderRadius: 1,
              pl: 1.5,
              height: '32px', // Match button height
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
              Filter:
            </Typography>
            <FilterContainer>
              {filterElements.map(element => renderReadOnlyFilter(element))}
            </FilterContainer>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }} onMouseDown={(e) => e.stopPropagation()}>
      <DataGrid
        key={refreshKey}
        rows={filteredRows}
        columns={columns}
        getRowId={(row: S3Bucket) => row.id}
        components={{
          Toolbar: CustomToolbar,
        }}
        density="compact"
        initialState={{
          pagination: {
            pageSize: 5,
          },
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }] as GridSortModel,
          },
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[1, 2, 3, 5, 8, 13, 21, 34, 55]}
        disableSelectionOnClick
        autoHeight
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'background.paper',
            borderBottom: '2px solid #e0e0e0',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'background.paper',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #e0e0e0',
            backgroundColor: 'background.paper',
          },
          '& .MuiDataGrid-toolbarContainer': {
            padding: '8px',
            backgroundColor: 'background.paper',
          },
        }}
      />

      <Dialog 
        open={isFilterDialogOpen} 
        onClose={() => setIsFilterDialogOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '900px', // Approximately 50% wider than the default 'sm' width (600px)
            maxWidth: '90vw', // Ensure it doesn't overflow on smaller screens
          }
        }}
      >
        <DialogTitle>Custom Filters</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {filterElements.length > 0 && (
              <>
                <Typography variant="subtitle2">Combined Filter</Typography>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 1.5,
                    backgroundColor: 'background.default',
                    minHeight: '50px',
                  }}
                >
                  <FilterContainer isEditable>
                    {filterElements.map((element, index) => renderDraggableFilter(element, index))}
                  </FilterContainer>
                </Paper>
              </>
            )}

            <Typography variant="subtitle2" sx={{ mt: 1 }}>Filter Components</Typography>
            <Box sx={{ display: 'flex', gap: 0.75 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddParenthesis('open')}
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  minWidth: '45px',
                }}
              >
                (
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddParenthesis('close')}
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  minWidth: '45px',
                }}
              >
                )
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddOperator('AND')}
              >
                AND
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddOperator('OR')}
              >
                OR
              </Button>
            </Box>

            <Typography variant="subtitle2">Add New Filter</Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Select
                  size="small"
                  value={currentFilter.field}
                  onChange={(e) => setCurrentFilter({ ...currentFilter, field: e.target.value })}
                  sx={{ minWidth: 120 }}
                >
                  {columns.map(col => (
                    <MenuItem key={col.field} value={col.field}>
                      {col.headerName}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  size="small"
                  value={currentFilter.operator}
                  onChange={(e) => setCurrentFilter({ ...currentFilter, operator: e.target.value })}
                  sx={{ minWidth: 120 }}
                >
                  {Object.entries(operators).map(([key, label]) => (
                    <MenuItem key={key} value={key}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              {currentFilter.operator !== 'isEmpty' && currentFilter.operator !== 'isNotEmpty' && (
                <TextField
                  size="small"
                  value={currentFilter.value}
                  onChange={(e) => setCurrentFilter({ ...currentFilter, value: e.target.value })}
                  placeholder="Value"
                />
              )}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddFilter}
                variant="contained"
                size="small"
              >
                Add Filter
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFilterDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default S3BucketsTable; 