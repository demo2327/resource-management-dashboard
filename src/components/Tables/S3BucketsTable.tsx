import React, { useState, useMemo, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridSortModel,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
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
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import s3InventoryData from '../../data/s3Inventory.json';

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

// Helper function to format bytes to human readable format
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

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

interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

const operators = {
  contains: 'contains',
  equals: 'equals',
  startsWith: 'starts with',
  endsWith: 'ends with',
  isEmpty: 'is empty',
  isNotEmpty: 'is not empty',
};

interface S3BucketsTableProps {
  widgetId: string;
}

const S3BucketsTable: React.FC<S3BucketsTableProps> = ({ widgetId }) => {
  const [filters, setFilters] = useState<Filter[]>(() => {
    const savedFilters = localStorage.getItem(`s3-buckets-filters-${widgetId}`);
    return savedFilters ? JSON.parse(savedFilters) : [];
  });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>({
    id: '',
    field: 'name',
    operator: 'contains',
    value: '',
  });

  // Save filters whenever they change
  useEffect(() => {
    localStorage.setItem(`s3-buckets-filters-${widgetId}`, JSON.stringify(filters));
  }, [filters, widgetId]);

  const handleAddFilter = () => {
    if (currentFilter.value || currentFilter.operator === 'isEmpty' || currentFilter.operator === 'isNotEmpty') {
      const newFilter = {
        ...currentFilter,
        id: Math.random().toString(36).substr(2, 9),
      };
      setFilters([...filters, newFilter]);
      setCurrentFilter({
        id: '',
        field: 'name',
        operator: 'contains',
        value: '',
      });
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    setFilters(filters.filter(f => f.id !== filterId));
  };

  const filteredRows = useMemo(() => {
    return s3InventoryData.data.filter(row => {
      return filters.every(filter => {
        const value = (() => {
          switch (filter.field) {
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

        switch (filter.operator) {
          case 'contains':
            return value.toLowerCase().includes(filter.value.toLowerCase());
          case 'equals':
            return value.toLowerCase() === filter.value.toLowerCase();
          case 'startsWith':
            return value.toLowerCase().startsWith(filter.value.toLowerCase());
          case 'endsWith':
            return value.toLowerCase().endsWith(filter.value.toLowerCase());
          case 'isEmpty':
            return !value || value === 'N/A';
          case 'isNotEmpty':
            return value && value !== 'N/A';
          default:
            return true;
        }
      });
    });
  }, [filters]);

  const CustomToolbar = () => (
    <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
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
      {filters.length > 0 && (
        <Stack direction="row" spacing={1}>
          {filters.map(filter => (
            <Chip
              key={filter.id}
              label={`${filter.field} ${filter.operator} ${filter.value || ''}`}
              onDelete={() => handleRemoveFilter(filter.id)}
              size="small"
            />
          ))}
        </Stack>
      )}
    </Box>
  );

  return (
    <Box 
      sx={{ width: '100%', height: '100%' }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row: S3Bucket) => row.id}
        components={{
          Toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            pageSize: 10,
          },
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }] as GridSortModel,
          },
        }}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Custom Filters</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Current Filters</Typography>
            {filters.map(filter => (
              <Box key={filter.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography>{filter.field}</Typography>
                <Typography>{filter.operator}</Typography>
                <Typography>{filter.value}</Typography>
                <IconButton size="small" onClick={() => handleRemoveFilter(filter.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Add New Filter</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
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
                Add
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