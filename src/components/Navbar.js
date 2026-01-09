import React, { useState } from 'react';
import Style from './Navbar.module.scss';
import Toggler from './home/Toggler';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { info } from '../assets/info/Info';

const links = [
  {
    name: 'Home',
    to: '/',
    active: 'home',
  },
  {
    name: 'About Me',
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
    name: 'Portfolio',
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
    <Box component={'nav'} width={'100%'} padding={'16px 0'}>
      <Box
        component={'ul'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={{ xs: '1rem', md: '4rem' }}
        fontSize={'1rem'}
        margin={'0'}
        padding={'0'}
        listStyle={'none'}
      >
        {links.map((link, index) => (
          <Box
            key={index}
            component={'li'}
            listStyle={'none'}
            className={link.active === active && !link.type && Style.active}
            sx={{ borderImageSource: info.gradient }}
          >
            <Link to={link.to} onClick={() => setActive(link.active)} className={Style.link}>
              {!link.type && <p style={{ padding: '0.5rem 0', margin: 0 }}>{link.name}</p>}
              {link.type && <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{link.name}</h1>}
            </Link>
          </Box>
        ))}
        <Box component={'li'} listStyle={'none'}>
          <Toggler darkMode={darkMode} handleClick={handleClick} />
        </Box>
      </Box>
    </Box>
  );
}
