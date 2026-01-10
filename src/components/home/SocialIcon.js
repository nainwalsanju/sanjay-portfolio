import React from 'react';

function SocialIcon(props) {
  const { link, icon, label } = props;
  return (
    <a target="_blank" aria-label={label} rel="noopener noreferrer" href={link}>
      <i className={icon} aria-hidden="true" style={{ fontSize: '2rem' }} />
    </a>
  );
}

export default SocialIcon;
