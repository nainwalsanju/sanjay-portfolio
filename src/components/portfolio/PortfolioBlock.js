import React from 'react';
import IconLink from './IconLink';
import { Box } from '@mui/material';

// Theme-aware colors for portfolio
const portfolioBorderColor = '#000000';
const portfolioShadow = '0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n' +
  '0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n' +
  '0 12.5px 10px rgba(0, 0, 0, 0.06),\n' +
  '0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n' +
  '0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n' +
  '0 100px 80px rgba(0, 0, 0, 0.12)';

function PortfolioBlock(props) {
  const { image, live, source, title } = props;
  const hasLive = !!live;
  const hasSource = !!source;
  
  return (
    <Box 
      display={'flex'} 
      flexDirection={'column'} 
      justifyContent={'flex-start'} 
      alignItems={'center'} 
      padding={'16px'}
      height={'100%'}
      minHeight={'420px'}
      boxSizing={'border-box'}
      width={'100%'}
    >
      <Box
        component={'img'}
        src={image}
        alt={'mockup'}
        width={'100%'}
        height={'220px'}
        sx={{
          objectFit: 'cover',
          borderRadius: '25px',
          boxShadow: portfolioShadow,
          aspectRatio: { xs: '16/10', md: 'unset' },
          maxWidth: '400px',
        }}
      />
      <h1 style={{ 
        fontSize: '1rem', 
        margin: '16px 0', 
        textAlign: 'center',
        fontWeight: 600,
        lineHeight: 1.4,
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center'
      }}>{title}</h1>
      <Box
        className={'portfolio'}
        display={'flex'}
        flexDirection={'row'}
        gap={'12px'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={'1.5rem'}
        py={'1.5rem'}
        width={'100%'}
        marginTop={'auto'}
      >
        {hasLive && (
          <Box 
            p={'8px 20px'} 
            border={`2px solid ${portfolioBorderColor}`} 
            borderRadius={'25px'}
            minWidth={'140px'}
            textAlign={'center'}
          >
            <IconLink link={live} title={'Live Demo'} icon={'fa fa-safari'} />
          </Box>
        )}

        {hasSource && (
          <Box 
            p={'8px 20px'} 
            border={`2px solid ${portfolioBorderColor}`} 
            borderRadius={'25px'}
            minWidth={'140px'}
            textAlign={'center'}
          >
            <IconLink link={source} title={'Source Code'} icon={'fa fa-code'} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PortfolioBlock;
