import React, { useEffect } from 'react';
import './App.module.scss';
import BaseLayout from './components/BaseLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { logGa } from './utils/log';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

/**
 * Main Application Component
 *
 * This is the root component of the React application that sets up:
 * - Error boundary for crash handling
 * - Router for client-side navigation
 * - Analytics tracking
 * - Main layout structure
 *
 * @returns {JSX.Element} The root application component
 */
function App() {
  // Track initial page visit for analytics
  useEffect(() => {
    logGa('home_page_visit');
  }, []);

  return (
    // Wrap entire app in error boundary to catch and handle runtime errors
    <ErrorBoundary>
      <div>
        {/* Set up client-side routing for navigation between pages */}
        <BrowserRouter>
          <BaseLayout />
        </BrowserRouter>

        {/* Vercel Analytics for tracking user interactions and performance */}
        <Analytics/>

        {/* Vercel Speed Insights for monitoring Core Web Vitals */}
        <SpeedInsights/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
