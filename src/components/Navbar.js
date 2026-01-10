import React, { useState } from 'react';
import Style from './Navbar.module.scss';
import Toggler from './home/Toggler';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { info } from '../assets/info/Info';

const links = [
  {
    name: 'Home',
    to: '/',
    active: 'home',
  },
  {
    name: 'About',
    to: '/about',
    active: 'about',
  },
  {
    name: info.initials,
    type: 'initials',
    to: '/',
    active: 'home',
  },
  {
    name: 'Projects',
    to: '/portfolio',
    active: 'portfolio',
  },
];

export default function Navbar({ darkMode, handleClick }) {
  const location = useLocation();
  const [active, setActive] = useState(
    location.pathname === '/' ? 'home' : location.pathname.slice(1, location.pathname.length),
  );

  return (
    <Box 
      component={'nav'} 
      width={'100%'} 
      padding={'16px 0'}
      position={'sticky'}
      top={0}
      bgcolor={darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
      backdropFilter={'blur(10px)'}
      zIndex={1000}
      sx={{
        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box
        component={'ul'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        maxWidth={'1200px'}
        margin={'0 auto'}
        padding={'0 2rem'}
        gap={{ xs: '1rem', md: '2rem' }}
        fontSize={'1rem'}
        listStyle={'none'}
      >
        {/* Left: Logo */}
        <Box component={'li'} listStyle={'none'}>
          <Link to={'/'} className={Style.link}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{info.initials}</h1>
          </Link>
        </Box>

        {/* Center: Navigation Links */}
        <Box
          component={'ul'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={{ xs: '1rem', md: '2rem' }}
          fontSize={'1rem'}
          margin={'0'}
          padding={'0'}
          listStyle={'none'}
        >
          {links.filter(link => !link.type).map((link, index) => (
            <Box
              key={index}
              component={'li'}
              listStyle={'none'}
              className={link.active === active && Style.active}
              sx={{ borderImageSource: info.gradient }}
            >
              <Link to={link.to} onClick={() => setActive(link.active)} className={Style.link}>
                <p style={{ padding: '0.5rem 0', margin: 0, fontWeight: 'bold', transition: 'color 0.3s ease' }}>{link.name}</p>
              </Link>
            </Box>
          ))}
        </Box>

        {/* Right: Resume Button and Dark Mode Toggle */}
        <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
          <Button
            variant="contained"
            href="https://drive.google.com/file/d/1kLdZWzTeRAAm4QtWrv2UQjHJ-H5ADOgd/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              background: info.gradient,
              color: '#0F172A',
              fontWeight: 'bold',
              padding: '8px 24px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                opacity: 0.9,
                transform: 'translateY(-1px)',
              }
            }}
          >
            Resume
          </Button>
          <Box component={'li'} listStyle={'none'}>
            <Toggler darkMode={darkMode} handleClick={handleClick} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
