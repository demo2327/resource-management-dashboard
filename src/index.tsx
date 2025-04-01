/**
 * Application Entry Point
 * 
 * This file serves as the main entry point for the React application.
 * It demonstrates several key React concepts and modern web development practices:
 * 
 * Technical Concepts:
 * 1. React 18 Features:
 *    - Uses createRoot API instead of legacy ReactDOM.render
 *    - Enables concurrent rendering features
 * 
 * 2. TypeScript Integration:
 *    - Type assertions for DOM elements
 *    - Enhanced development-time type checking
 * 
 * 3. Performance Monitoring:
 *    - Web Vitals integration for performance metrics
 *    - Measures Core Web Vitals (LCP, FID, CLS)
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root container for React 18's concurrent features
// TypeScript assertion ensures type safety for the DOM element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the application within StrictMode
// StrictMode enables additional development checks and warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Web Vitals Performance Monitoring
 * 
 * reportWebVitals enables performance measurement of key metrics:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 * 
 * To use: Pass a function to log results (e.g., reportWebVitals(console.log))
 * Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
