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
            background: '#22304A',
            color: '#F5F7FA',
            border: '2px solid #09C6F9',
            width: 64,
            height: 64,
            zIndex: 1200,
            boxShadow: '0 8px 24px rgba(2,44,112,0.18)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            '&:hover': {
              transform: 'translateY(-3px) scale(1.03)',
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