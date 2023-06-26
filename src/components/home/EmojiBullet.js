import React from 'react';
import { Box } from '@mui/material';

function EmojiBullet(props) {
  const { emoji, text, link } = props;

  const renderContent = () => {
    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Box
            component={'span'}
            aria-label="cheese"
            role="img"
            mr={{ xs: '0.5rem', md: '1rem' }}
            fontSize={'1.5rem'}
          >
            {emoji}
          </Box>
          {text}
        </a>
      );
    } else {
      return (
        <>
          <Box
            component={'span'}
            aria-label="cheese"
            role="img"
            mr={{ xs: '0.5rem', md: '1rem' }}
            fontSize={'1.5rem'}
          >
            {emoji}
          </Box>
          {text}
        </>
      );
    }
  };

  return (
    <Box
      component={'li'}
      fontSize={'1rem'}
      lineHeight={1.5}
      style={{ cursor: 'default', display: 'flex', alignItems: 'center' }}
    >
      {renderContent()}
    </Box>
  );
}

export default EmojiBullet;
