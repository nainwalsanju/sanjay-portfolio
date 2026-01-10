import React from 'react';
import IconLink from './IconLink';
import { Box, Typography, Chip, Button } from '@mui/material';

// Theme-aware colors for portfolio
const portfolioBorderColor = '#000000';
const portfolioShadow = '0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n' +
  '0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n' +
  '0 12.5px 10px rgba(0, 0, 0, 0.06),\n' +
  '0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n' +
  '0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n' +
  '0 100px 80px rgba(0, 0, 0, 0.12)';

function PortfolioBlock(props) {
  const { image, live, source, title, problem, description, tech, role, result, featured } = props;
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
      minHeight={'500px'}
      boxSizing={'border-box'}
      width={'100%'}
      sx={{
        bgcolor: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 217, 255, 0.2)'
        }
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <Box mb={1} width="100%" display="flex" justifyContent="flex-end">
          <Chip 
            label="FEATURED" 
            color="primary" 
            size="small"
            sx={{
              background: 'rgba(0, 217, 255, 0.2)',
              border: '1px solid #00D9FF',
              color: '#00D9FF',
              fontWeight: 'bold'
            }}
          />
        </Box>
      )}

      <Box
        component={'img'}
        src={image}
        alt={'project mockup'}
        width={'100%'}
        height={'220px'}
        sx={{
          objectFit: 'cover',
          borderRadius: '12px',
          boxShadow: portfolioShadow,
          aspectRatio: { xs: '16/10', md: 'unset' },
          maxWidth: '400px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      />
      
      <Typography variant="h6" sx={{ 
        margin: '16px 0 8px 0', 
        textAlign: 'center',
        fontWeight: 700,
        color: '#e2e8f0',
        lineHeight: 1.4,
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {title}
      </Typography>

      {/* Problem Statement */}
      {problem && (
        <Typography variant="body2" sx={{ 
          color: '#94a3b8', 
          textAlign: 'center', 
          mb: 2,
          fontSize: '0.875rem',
          fontStyle: 'italic'
        }}>
          {problem}
        </Typography>
      )}

      {/* Description */}
      {description && (
        <Typography variant="body2" sx={{ 
          color: '#e2e8f0', 
          textAlign: 'center', 
          mb: 2,
          fontSize: '0.875rem',
          lineHeight: 1.5
        }}>
          {description}
        </Typography>
      )}

      {/* Tech Stack */}
      {tech && (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1} mb={2}>
          {tech.map((techItem, index) => (
            <Chip 
              key={index}
              label={techItem}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#e2e8f0',
                fontSize: '0.75rem'
              }}
            />
          ))}
        </Box>
      )}

      {/* Role & Result */}
      <Box display="flex" flexDirection="column" gap={1} mb={3} width="100%">
        {role && (
          <Typography variant="caption" sx={{ color: '#94a3b8', textAlign: 'center' }}>
            🎯 {role}
          </Typography>
        )}
        {result && (
          <Typography variant="caption" sx={{ color: '#10b981', textAlign: 'center', fontWeight: 'bold' }}>
            📊 {result}
          </Typography>
        )}
      </Box>

      {/* Buttons */}
      <Box
        className={'portfolio'}
        display={'flex'}
        flexDirection={'row'}
        gap={'12px'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        marginTop={'auto'}
      >
        {hasLive && (
          <Button 
            variant="outlined"
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: '#00D9FF',
              color: '#00D9FF',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                background: '#00D9FF',
                color: '#0F172A',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Live Demo
          </Button>
        )}

        {hasSource && (
          <Button 
            variant="outlined"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#e2e8f0',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Source Code
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default PortfolioBlock;
