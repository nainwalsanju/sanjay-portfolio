import React from 'react';
import PortfolioBlock from './PortfolioBlock';
import { Box, Grid, Container, Typography, Chip } from '@mui/material';
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
      <Box mb={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00D9FF', fontWeight: 'bold' }}>
          Featured Projects
        </Typography>
        <Typography variant="body1" sx={{ color: '#e2e8f0' }}>
          A showcase of my technical projects and contributions
        </Typography>
      </Box>
      
      <Grid 
        container 
        spacing={{ xs: 3, md: 4 }}
        width={'100%'}
        margin={0}
      >
        {info.portfolio.map((project, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            lg={4}
            key={index}
            sx={{ width: '100%' }}
          >
            <PortfolioBlock
              image={project.image}
              live={project.liveDemo}
              source={project.sourceCode}
              title={project.title}
              problem={project.problem}
              description={project.description}
              tech={project.tech}
              role={project.role}
              result={project.result}
              featured={project.featured}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
