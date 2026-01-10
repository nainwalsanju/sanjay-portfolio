import React from 'react';
import Style from './About.module.scss';
import { Box, Typography, Chip, Card, CardContent, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { info } from '../../assets/info/Info';

export default function About() {
  return (
    <Box 
      display={'flex'} 
      flexDirection={'column'} 
      alignItems={'center'} 
      mt={'3rem'}
      maxWidth={'1200px'}
      margin={'0 auto'}
      padding={{ xs: '2rem', md: '4rem' }}
    >
      {/* Professional Bio Section */}
      <Box 
        width={'100%'}
        mb={6}
        padding={4}
        borderRadius={3}
        bgcolor={'rgba(15, 23, 42, 0.8)'}
        border={'1px solid rgba(255, 255, 255, 0.1)'}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#00D9FF', fontWeight: 'bold' }}>
          Professional Bio
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#e2e8f0', lineHeight: 1.8 }}>
          I'm a Backend Engineer with 4+ years of experience building scalable systems at Razorpay and BharatPe. 
          I specialize in distributed systems, payment infrastructure, and handling massive data migrations (10B+ records). 
          Passionate about system design, performance optimization, and learning modern backend technologies.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#94a3b8' }}>
          Currently: SDE2 @ BharatPe | Open to Senior Backend roles
        </Typography>
      </Box>

      {/* Work Experience Section */}
      <Box width={'100%'} mb={6}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00D9FF', fontWeight: 'bold', mb: 4 }}>
          Work Experience
        </Typography>
        <Grid container spacing={3}>
          {info.workExperience.map((experience, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                sx={{ 
                  bgcolor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 217, 255, 0.2)'
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#00D9FF', fontWeight: 'bold' }}>
                        {experience.position}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#e2e8f0' }}>
                        {experience.company}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {experience.duration}
                    </Typography>
                  </Box>
                  
                  <List>
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <React.Fragment key={achievementIndex}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2" sx={{ color: '#e2e8f0', fontWeight: 'bold' }}>
                                {achievement.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                                  {achievement.description}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#10b981', mt: 1 }}>
                                  📈 {achievement.impact}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {achievementIndex < experience.achievements.length - 1 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
                      </React.Fragment>
                    ))}
                  </List>

                  <Box mt={2}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', mb: 1, display: 'block' }}>
                      Tech Stack:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {experience.techStack.map((tech, techIndex) => (
                        <Chip 
                          key={techIndex}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: '#e2e8f0'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Skills Section */}
      <Box width={'100%'} mb={6}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00D9FF', fontWeight: 'bold', mb: 4 }}>
          Technical Skills
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#00D9FF', mb: 2 }}>
                  {info.skills.expert.category}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {info.skills.expert.items.map((skill, index) => (
                    <Chip 
                      key={index}
                      label={skill}
                      color="primary"
                      variant="outlined"
                      sx={{ borderColor: '#00D9FF', color: '#00D9FF' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#00D9FF', mb: 2 }}>
                  {info.skills.proficient.category}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {info.skills.proficient.items.map((skill, index) => (
                    <Chip 
                      key={index}
                      label={skill}
                      variant="outlined"
                      sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#e2e8f0' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#00D9FF', mb: 2 }}>
                  {info.skills.familiar.category}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {info.skills.familiar.items.map((skill, index) => (
                    <Chip 
                      key={index}
                      label={skill}
                      variant="outlined"
                      sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Interests Section */}
      <Box width={'100%'}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00D9FF', fontWeight: 'bold', mb: 4 }}>
          Interests & Learning
        </Typography>
        <Grid container spacing={2}>
          {info.hobbies.map((hobby, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  bgcolor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(0, 217, 255, 0.1)'
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <span style={{ fontSize: '1.5rem' }}>{hobby.emoji}</span>
                    <Typography variant="body1" sx={{ color: '#e2e8f0' }}>
                      {hobby.label}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
