import React from 'react';
import { Box } from '@mui/material';
import Chat from './Chat';
import { Message } from '@mui/icons-material';

export default function ChatIcon({ darkMode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: `linear-gradient(135deg, ${styles.purple} 0%, ${styles.pink} 100%)`,
          color: darkMode ? '#fff' : '#2c3e50',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 3,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1) rotate(10deg)',
            boxShadow: 6
          }
        }}
      >
        <Message sx={{ fontSize: 28 }} />
      </Box>
      <Chat open={open} setOpen={setOpen} darkMode={darkMode} />
    </>
  );
}