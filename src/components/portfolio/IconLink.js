import React from 'react';

function IconLink(props) {
  const { link, title, icon } = props;
  return (
    <a 
      href={link} 
      target={'_blank'} 
      rel="noopener noreferrer"
      style={{ 
        textDecoration: 'none', 
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '1rem'
      }}
    >
      <i className={icon} /> {title}
    </a>
  );
}

export default IconLink;
