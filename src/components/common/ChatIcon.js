import React, { useState } from 'react';
import { Fab } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import Chat from '../Chat';

/**
 * Floating Chat Button Component
 *
 * Provides a floating action button that toggles the AI chat interface.
 * Positioned in the bottom-right corner with theme-aware styling.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.darkMode - Current theme state
 * @returns {JSX.Element} Floating chat button and chat interface
 */
const ChatIconComponent = ({ darkMode }) => {
  // State to control chat interface visibility
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button for opening chat */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setChatOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          // Theme-aware background and border colors
          bgcolor: darkMode ? '#1A2634' : '#F8F9FA',
          color: darkMode ? '#F8F9FA' : '#1A2634',
          border: `2px solid ${darkMode ? '#F8F9FA' : '#1A2634'}`,
          '&:hover': {
            // Invert colors on hover for better UX
            bgcolor: darkMode ? '#F8F9FA' : '#1A2634',
            color: darkMode ? '#1A2634' : '#F8F9FA',
          },
          zIndex: 1200, // Above other content but below chat modal
          width: 56,
          height: 56,
        }}
      >
        <ChatIcon sx={{ fontSize: 24 }} />
      </Fab>

      {/* AI Chat Interface - conditionally rendered */}
      <Chat open={chatOpen} setOpen={setChatOpen} darkMode={darkMode} />
    </>
  );
};

export default ChatIconComponent;