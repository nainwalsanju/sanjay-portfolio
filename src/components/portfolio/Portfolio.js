import React from 'react';
import PortfolioBlock from './PortfolioBlock';
import { Box, Grid, Container } from '@mui/material';
import { info } from '../../assets/info/Info';

export default function Portfolio() {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        padding: { xs: '16px', md: '32px' },
        width: '100%',
        boxSizing: 'border-box',
        margin: '0 auto'
      }}
    >
      <Grid 
        container 
        spacing={{ xs: 2, md: 3 }}
        width={'100%'}
        margin={0}
      >
        {info.portfolio.map((project, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            key={index}
            sx={{ width: '100%' }}
          >
            <PortfolioBlock
              image={project.image}
              live={project.live}
              source={project.source}
              title={project.title}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
