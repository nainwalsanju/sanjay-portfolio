import React from 'react';
import { Box, Typography, Button } from '@mui/material';

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing
 * the entire application.
 *
 * @class
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  /**
   * Initialize error boundary state
   * @param {Object} props - Component props
   */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,      // Flag indicating if an error occurred
      error: null,          // The error object
      errorInfo: null       // Additional error information
    };
  }

  /**
   * Update state when an error is caught
   * This method is called during the "render" phase
   *
   * @static
   * @param {Error} error - The error that was thrown
   * @returns {Object} Updated state
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  /**
   * Handle caught errors
   * This method is called during the "commit" phase
   *
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Information about the error
   */
  componentDidCatch(error, errorInfo) {
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console (in production, send to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  /**
   * Render method - shows error UI or children based on error state
   * @returns {JSX.Element} Error UI or child components
   */
  render() {
    // If an error occurred, render the error fallback UI
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            p: 3,
            textAlign: 'center'
          }}
        >
          {/* Error message for users */}
          <Typography variant="h6" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </Typography>

          {/* Refresh button to allow users to recover */}
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Refresh Page
          </Button>

          {/* Development-only error details for debugging */}
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 3, textAlign: 'left', maxWidth: 600 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Error:</strong> {this.state.error && this.state.error.toString()}
              </Typography>
              {this.state.errorInfo && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Component Stack:</strong>
                  <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </Typography>
              )}
            </Box>
          )}
        </Box>
      );
    }

    // No error occurred, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;