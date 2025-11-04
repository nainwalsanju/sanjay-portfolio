import React from 'react';
import { Box, Fab, Badge, Tooltip } from '@mui/material';
import Chat from './Chat';
import { Message } from '@mui/icons-material';
import styles from '../variables.modules.scss';

export default function ChatIcon({ darkMode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip title={open ? 'Close chat' : 'Open chat'}>
        <Fab
          onClick={() => setOpen(!open)}
          sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))',
            color: '#FFFFFF',
            width: 60,
            height: 60,
            zIndex: 1200,
            boxShadow: '0 12px 32px rgba(0,255,164,0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))',
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 40px rgba(166,104,255,0.25)',
            },
            '&:active': {
              transform: 'translateY(-2px)',
            }
          }}
        >
          <Message sx={{ fontSize: 28 }} />
        </Fab>
      </Tooltip>
      <Chat open={open} setOpen={setOpen} darkMode={darkMode} />
    </>
  );
}