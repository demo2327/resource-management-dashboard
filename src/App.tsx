/**
 * Main Application Component
 * 
 * This is the root component of a React application that implements a dashboard-style interface
 * using React Router for navigation and Material-UI (MUI) for styling.
 * 
 * Key Technical Concepts:
 * - React Router: Enables client-side routing with <Router>, <Routes>, and <Route> components
 * - Material-UI: A React UI framework that implements Google's Material Design
 * - Context API: Used via ThemeProvider and CustomPagesProvider for state management
 * - Flexbox Layout: Utilized through MUI's Box component for responsive design
 */

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
import CustomPage from './pages/CustomPage';
import { ThemeProvider } from './theme/ThemeContext';
import { CustomPagesProvider } from './context/CustomPagesContext';

/**
 * App Component
 * 
 * The main application component that sets up:
 * 1. Theme context for consistent styling
 * 2. Custom pages context for dynamic page management
 * 3. Router configuration for navigation
 * 4. Basic layout structure with header, sidebar, and main content area
 * 
 * Layout Structure:
 * - Uses MUI's Box component with flexbox for responsive layout
 * - CssBaseline: MUI's normalized CSS baseline
 * - Header: Fixed position app bar
 * - Sidebar: Navigation drawer
 * - Main content: Flexible growing area for route content
 * 
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <ThemeProvider>
      <CustomPagesProvider>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <Sidebar />
            {/* Main content area
                sx props explanation:
                - flexGrow: 1 -> allows the element to grow and fill available space
                - p: 3 -> applies padding of 24px (3 * 8px theme spacing)
                - marginTop: '64px' -> compensates for fixed header height */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: '100%',
                marginTop: '64px',
              }}
            >
              {/* Route Configuration:
                  - Each Route maps a URL path to a specific component
                  - Nested routes under /aws-inventory/ demonstrate hierarchical routing
                  - Dynamic route (/custom/:id) shows parameter-based routing */}
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
                <Route path="/custom/:id" element={<CustomPage />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </CustomPagesProvider>
    </ThemeProvider>
  );
}

export default App;
