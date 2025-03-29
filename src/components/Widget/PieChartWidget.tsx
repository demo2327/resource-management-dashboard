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

// Sample pet data with dynamic colors
const PieChartWidget: React.FC = () => {
  const theme = useTheme();

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

  // Chart options with improved text rendering
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