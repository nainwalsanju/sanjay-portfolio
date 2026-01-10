import React from 'react';
import Style from './Home.module.scss';
import me from '../../assets/img/self.png';
import classNames from 'classnames';
import EmojiBullet from './EmojiBullet';
import SocialIcon from './SocialIcon';
import { Box, Grid, Chip, Button } from '@mui/material';
import { info } from '../../assets/info/Info';

export default function Home({ darkMode }) {
  return (
    <Box
      component={'main'}
      display={'flex'}
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems={'center'}
      justifyContent={'center'}
      minHeight={'calc(100vh - 175px)'}
      maxWidth={'1200px'}
      margin={'0 auto'}
      padding={{ xs: '2rem', md: '4rem' }}
    >
      <Box
        className={classNames(Style.avatar, Style.shadowed)}
        alt={'image of developer'}
        style={{ background: info.gradient, objectFit: 'cover' }}
        component={'img'}
        src={me}
        width={{ xs: '30vh', md: '35vh' }}
        height={{ xs: '30vh', md: '35vh' }}
        borderRadius={'50%'}
        p={'0.75rem'}
        mb={{ xs: '2rem', md: 0 }}
        mr={{ xs: 0, md: '3rem' }}
        sx={{
          border: `2px solid ${info.gradient}`,
          boxShadow: darkMode 
            ? '0 0 20px rgba(0, 217, 255, 0.3)'
            : '0 0 20px rgba(0, 217, 255, 0.2)'
        }}
      />
      
      <Box
        style={{
          borderRadius: '1rem',
          background: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          boxShadow: darkMode
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '2rem',
          transition: 'all 0.3s ease',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Open to Work Badge */}
        <Box mb={2}>
          <Chip 
            label="🟢 OPEN TO WORK" 
            color="primary" 
            variant="outlined"
            sx={{
              background: darkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.1)',
              border: '1px solid #00D9FF',
              color: '#00D9FF',
              fontWeight: 'bold'
            }}
          />
        </Box>

        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>
          Hi, I'm{' '}
          <span
            style={{
              background: info.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {info.firstName}
          </span>
          <span className={Style.hand}>👋</span>
        </h1>
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', color: darkMode ? '#94a3b8' : '#475569' }}>
          {info.position}
        </h2>

        {/* Quick Stats */}
        <Grid container spacing={2} mb={3}>
          {info.quickStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                padding={1.5}
                borderRadius={2}
                bgcolor={darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}
              >
                <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{stat.label}</span>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Featured Skills */}
        <Box mb={3}>
          <Box mb={1} fontSize="0.875rem" color={darkMode ? '#94a3b8' : '#64748b'} fontWeight="bold">
            TECH STACK
          </Box>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {info.featuredSkills.map((skillGroup, index) => (
              <Box key={index} display="flex" gap={1} flexWrap="wrap">
                {skillGroup.items.map((skill, skillIndex) => (
                  <Chip 
                    key={skillIndex}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                      color: darkMode ? '#e2e8f0' : '#334155'
                    }}
                  />
                ))}
                {index < info.featuredSkills.length - 1 && (
                  <Box mx={1} height="24px" width="1px" bgcolor={darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Call to Action Buttons */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <Button
            variant="contained"
            href="https://drive.google.com/file/d/1kLdZWzTeRAAm4QtWrv2UQjHJ-H5ADOgd/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              background: info.gradient,
              color: '#0F172A',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                opacity: 0.9,
                transform: 'translateY(-1px)',
              }
            }}
          >
            Download Resume
          </Button>
          <Button
            variant="outlined"
            href="/portfolio"
            sx={{
              borderColor: info.gradient,
              color: darkMode ? '#e2e8f0' : '#1e293b',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                background: info.gradient,
                color: '#0F172A',
                transform: 'translateY(-1px)',
              }
            }}
          >
            View Projects
          </Button>
        </Box>

        {/* Contact Info */}
        <Box component={'ul'} p={0} mb={3}>
          {info.miniBio.map((bio, index) => (
            <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} link={bio.link} />
          ))}
        </Box>

        {/* Social Links */}
        <Box
          display={'flex'}
          gap={'1.5rem'}
          justifyContent={'flex-start'}
          flexWrap="wrap"
        >
          {info.socials.map((social, index) => (
            <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
