import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridSortModel,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Box, Link } from '@mui/material';
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

const S3BucketsTable = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <DataGrid
        rows={s3InventoryData.data}
        columns={columns}
        getRowId={(row: S3Bucket) => row.id}
        components={{
          Toolbar: GridToolbar,
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
    </Box>
  );
};

export default S3BucketsTable; 