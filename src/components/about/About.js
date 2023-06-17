import React from 'react';
import Style from './About.module.scss';
import Terminal from './Terminal';
import { Box } from '@mui/material';
import { info } from '../../assets/info/Info';

export default function About() {
  const firstName = info.firstName.toLowerCase();

  function aboutMeText() {
    return (
      <>
        <p>
          <span style={{ color: info.baseColor }}>
            {firstName}
            {info.lastName.toLowerCase()} $
          </span>{' '}
          cat about-{firstName}{' '}
        </p>
        <p>
          <span style={{ color: info.baseColor }}>
            about-{firstName} <span className={Style.green}>(main)</span> ${' '}
          </span>
          {info.bio}
        </p>
      </>
    );
  }

  const skillsSection = (skill) => {
    const keyName = Object.keys(skill)[0];
    const values = skill[keyName];

    return (
      <div key={keyName}>
        <p style={{ color: info.baseColor }}> {keyName}</p>
        <ul className={Style.skills}>
          {values.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  };

  function skillsText() {
    return (
      <>
        <p>
          <span style={{ color: info.baseColor }}>
            {firstName}
            {info.lastName.toLowerCase()} $
          </span>{' '}
          cd skills
        </p>
        <p>
          <span style={{ color: info.baseColor }}>
            skills <span className={Style.green}>(main)</span> $
          </span>{' '}
          ls
        </p>
        {Object.keys(info.skills).map((key) => {
          return skillsSection({ [key]: info.skills[key] });
        })}
      </>
    );
  }

  function miscText() {
    return (
      <>
        <p>
          <span style={{ color: info.baseColor }}>
            {firstName}
            {info.lastName.toLowerCase()} $
          </span>{' '}
          cd hobbies/interests
        </p>
        <p>
          <span style={{ color: info.baseColor }}>
            hobbies/interests <span className={Style.green}>(main)</span> $
          </span>{' '}
          ls
        </p>
        <ul>
          {info.hobbies.map((hobby, index) => (
            <li key={index}>
              <Box component={'span'} mr={'1rem'}>
                {hobby.emoji}
              </Box>
              {hobby.label}
            </li>
          ))}
        </ul>
      </>
    );
  }

  function workExperienceText() {
    return (
      <>
        <p>
          <span style={{ color: info.baseColor }}>
            {info.firstName}
            {info.lastName.toLowerCase()} $
          </span>{" "}
          cd work-experience
        </p>
        <p>
          <span style={{ color: info.baseColor }}>
            work-experience <span className={Style.green}>(main)</span> $
          </span>{" "}
          ls
        </p>
        <ul>
          {info.workExperience.map((experience, index) => (
            <li key={index} className={Style.workExperienceItem}>
              <p className={Style.company}>{experience.company}</p>
              <p className={Style.position}>{experience.position}</p>
              <p className={Style.duration}>{experience.duration}</p>
              <ul className={Style.descriptionList}>
                {experience.description.map((bulletPoint, bulletIndex) => (
                  <li className={Style.descriptionList} key={bulletIndex}>{bulletPoint}</li>
                ))}
              </ul>
              {index !== info.workExperience.length - 1 && <hr />} {/* Add horizontal line except for the last work experience */}
            </li>
          ))}
        </ul>
      </>
    );
  }
  
  
  

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
      <Terminal text={aboutMeText()} />
      <Terminal text={workExperienceText()} /> {/* Add work experience terminal */}
      <Terminal text={skillsText()} />
      <Terminal text={miscText()} />
    </Box>
  );
}
