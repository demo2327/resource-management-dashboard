/**
 * Pie Chart Widget Component
 * 
 * This component implements a responsive pie chart visualization using Chart.js.
 * It provides a customizable chart for displaying proportional data with dynamic theming.
 * 
 * Technical Concepts:
 * 1. Chart.js for data visualization
 * 2. Material-UI theming integration
 * 3. Responsive chart rendering
 * 4. Dynamic color palette management
 */

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * PieChartWidget Component
 * 
 * Displays data in a pie chart format with customizable styling and tooltips.
 * 
 * Features:
 * - Responsive chart sizing
 * - Dynamic color theming
 * - Interactive tooltips
 * - Custom legend positioning
 * - Percentage-based data display
 * 
 * @component
 */
const PieChartWidget: React.FC = () => {
  const theme = useTheme();

  /**
   * Sample pet data with dynamic colors based on theme
   * Demonstrates the widget's data structure and theming capabilities
   */
  const petData = {
    labels: ['Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets'],
    datasets: [
      {
        data: [35, 30, 15, 12, 8],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.info.main,
          theme.palette.success.main,
          theme.palette.warning.main,
        ],
        borderColor: [
          theme.palette.primary.dark,
          theme.palette.secondary.dark,
          theme.palette.info.dark,
          theme.palette.success.dark,
          theme.palette.warning.dark,
        ],
        borderWidth: 2,
      },
    ],
  };

  /**
   * Chart options configuration
   * Includes responsive settings, legend positioning, and tooltip customization
   */
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
            family: theme.typography.fontFamily,
            weight: 'bold'
          },
          color: theme.palette.text.primary
        }
      },
      tooltip: {
        titleFont: {
          size: 14,
          family: theme.typography.fontFamily,
          weight: 'bold'
        },
        bodyFont: {
          size: 14,
          family: theme.typography.fontFamily
        },
        padding: 12,
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            const percentage = Math.round(value) + '%';
            return ` ${label}: ${percentage}`;
          }
        }
      }
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      '& canvas': {
        maxWidth: '100%',
        height: 'auto'
      }
    }}>
      <Pie data={petData} options={options} />
    </Box>
  );
};

export default PieChartWidget; 