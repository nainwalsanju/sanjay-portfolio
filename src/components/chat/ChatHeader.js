import React from 'react';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const ChatHeader = ({ darkMode, onClose }) => {
  return (
    <Box
      sx={{
        bgcolor: darkMode ? '#1A2634' : '#F8F9FA',
        boxShadow: 'none',
        px: 2,
        py: 1,
        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)'
      }}
    >
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '52px',
        p: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src={require('../../assets/img/self.png')}
            alt="Sanjay Nainwal"
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
          <Box>
            <Typography sx={{
              background: '-webkit-linear-gradient(135deg, rgb(0, 255, 164), rgb(166, 104, 255))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '-0.01em',
              lineHeight: 1.2
            }}>
              Ask me about Sanjay
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            padding: '4px',
            '&:hover': {
              color: darkMode ? '#fff' : 'rgba(0,0,0,0.7)',
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
            }
          }}
        >
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </Toolbar>
    </Box>
  );
};

export default ChatHeader;