import React, { useEffect, useState, Suspense, lazy } from 'react';
import Style from './BaseLayout.module.scss';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import { Box, Grid, CircularProgress } from '@mui/material';
import ParticlesBg from './particles/ParticlesBg';
import { logGa } from '../utils/log';
import ChatIcon from './common/ChatIcon';

// Lazy load route components for better performance
// Code splitting reduces initial bundle size and improves load times
const Home = lazy(() => import('./home/Home'));
const About = lazy(() => import('./about/About'));
const Portfolio = lazy(() => import('./portfolio/Portfolio'));

/**
 * Loading spinner component displayed during lazy loading
 * @returns {JSX.Element} Centered loading spinner
 */
const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

/**
 * Base Layout Component
 *
 * Main layout wrapper that provides:
 * - Dark/light mode state management
 * - Navigation bar
 * - Background particles
 * - Client-side routing
 * - AI chat interface
 * - Responsive layout structure
 *
 * @returns {JSX.Element} The main application layout
 */
export default function BaseLayout() {
  // Dark mode state - persisted in localStorage
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Toggle between dark and light themes
   * Updates localStorage for persistence and sends analytics event
   */
  function handleToggleDarkMode() {
    const oppositeOfCurrentDarkMode = !darkMode;
    // Persist theme preference in localStorage
    localStorage.setItem('darkMode', `${oppositeOfCurrentDarkMode}`);
    setDarkMode(oppositeOfCurrentDarkMode);
    // Track theme changes for analytics
    logGa('dark_mode_toggle', oppositeOfCurrentDarkMode ? 'dark' : 'light');
  }

  // Initialize dark mode on component mount
  useEffect(() => {
    // Check if user has a saved theme preference
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));

    // Set up OS dark mode detection
    const osDarkModeQuery = window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

    if (savedDarkMode !== null) {
      // User has explicitly set a preference, use it
      setDarkMode(savedDarkMode);
    } else {
      // No saved preference, use OS preference and save it
      const osPrefersDark = !!osDarkModeQuery?.matches;
      localStorage.setItem('darkMode', `${osPrefersDark}`);
      setDarkMode(osPrefersDark);
    }

    // Listen for OS theme changes when no user preference is set
    const updateDarkMode = (e) => {
      if (JSON.parse(localStorage.getItem('darkMode')) === null) {
        setDarkMode(e.matches);
      }
    };

    if (osDarkModeQuery) {
      osDarkModeQuery.addEventListener('change', updateDarkMode);
    }

    // Cleanup listener on unmount
    return () => {
      if (osDarkModeQuery) {
        osDarkModeQuery.removeEventListener('change', updateDarkMode);
      }
    };
  }, []);

  return (
    // Main container with theme-based styling
    <Box className={darkMode ? Style.dark : Style.light}>
      {/* Animated particle background */}
      <ParticlesBg darkMode={darkMode.valueOf()} />

      {/* Main layout grid - full height, column direction */}
      <Grid
        container
        display={'flex'}
        flexDirection={'column'}
        minHeight={'100vh'}
        justifyContent={'space-between'}
      >
        {/* Navigation bar at the top */}
        <Grid item>
          <Navbar darkMode={darkMode} handleClick={handleToggleDarkMode} />
        </Grid>

        {/* Main content area - expands to fill available space */}
        <Grid item flexGrow={1}>
          {/* Suspense wrapper for lazy-loaded routes */}
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Home page route */}
              <Route exact path={'/'} element={<Home darkMode={darkMode} />} />
              {/* About page route */}
              <Route exact path={'/about'} element={<About />} />
              {/* Portfolio page route */}
              <Route exact path={'/portfolio'} element={<Portfolio />} />
            </Routes>
          </Suspense>
        </Grid>

        {/* Footer section (currently commented out)
        <Grid item>
          <Box
            component={'footer'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            py={'1.5rem'}
            sx={{ opacity: 0.7 }}
            width={'100%'}
          >
            <p>
              template created with &hearts; by{' '}
              <a href={'https://paytonpierce.dev'}>Payton Pierce</a>
            </p>
            <p>
              enhence implemented with &hearts; by <a href={'https://andy8647.com'}>Andy Luo </a>,
              redesigned with &hearts; by <a href={'https://ingrid0126.com'}>Ingrid Fei</a>
            </p>
            <p>&copy; 2023</p>
          </Box>
        </Grid> */}
      </Grid>

      {/* Floating AI chat button */}
      <ChatIcon darkMode={darkMode} />
    </Box>
  );
}
