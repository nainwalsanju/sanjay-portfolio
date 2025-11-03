import React from 'react';
import { Box } from '@mui/material';
import Chat from './Chat';
import { Message } from '@mui/icons-material';
import styles from '../variables.modules.scss';

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
          background: (theme) => `linear-gradient(135deg, ${styles.purple || theme.palette.primary.main} 0%, ${styles.pink || theme.palette.secondary.main} 100%)`,
          color: (theme) => darkMode ? theme.palette.common.white : theme.palette.grey[900],
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: (theme) => theme.shadows[3],
          zIndex: 1000,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1) rotate(10deg)',
            boxShadow: (theme) => theme.shadows[6]
          }
        }}
      >
        <Message sx={{ fontSize: 28 }} />
      </Box>
      <Chat open={open} setOpen={setOpen} darkMode={darkMode} />
    </>
  );
}