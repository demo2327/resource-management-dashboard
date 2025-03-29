import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import EntryPage from './pages/EntryPage';
import AppInfoPage from './pages/AppInfoPage';
import PlatformInfoPage from './pages/PlatformInfoPage';
import AwsInventoryPage from './pages/AwsInventoryPage';
import EC2Page from './pages/aws/EC2Page';
import RDSPage from './pages/aws/RDSPage';
import S3Page from './pages/aws/S3Page';
import VPCPage from './pages/aws/VPCPage';
import ECSPage from './pages/aws/ECSPage';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            marginTop: '64px',
          }}
        >
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/app-info" element={<AppInfoPage />} />
            <Route path="/platform-info" element={<PlatformInfoPage />} />
            <Route path="/aws-inventory" element={<AwsInventoryPage />} />
            <Route path="/aws-inventory/ec2" element={<EC2Page />} />
            <Route path="/aws-inventory/rds" element={<RDSPage />} />
            <Route path="/aws-inventory/s3" element={<S3Page />} />
            <Route path="/aws-inventory/vpc" element={<VPCPage />} />
            <Route path="/aws-inventory/ecs" element={<ECSPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
