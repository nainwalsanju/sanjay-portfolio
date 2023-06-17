import self from '../img/self.png';
import { colors } from '../colors/mainGradient';

export const info = {
  firstName: 'Sanjay',
  lastName: 'Nainwal',
  initials: 'SN', // the example uses first and last, but feel free to use three or more if you like.
  position: 'Full Stack Developer(BE-Heavy)',
  selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
  gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
  baseColor: colors[0],
  miniBio: [
    // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
    {
      emoji: '🇮🇳',
      text: 'Based in Dehardun, India',
    },
    {
      emoji: '💻',
      text: 'Software Development Engineer II at BharatPe',
    },
    {
      emoji: '📧',
      text: 'sanjaynainwal129@gmail.com',
    },
  ],
  socials: [
    {
      link: 'https://drive.google.com/file/d/1Rm3S-u6_7r4yDQefWNypFrHlhaY6HII9/view?usp=sharing', // this should be https://yourname.com/resume.pdf once you've deployed
      icon: 'fa fa-file-pdf-o',
      label: 'resume',
    },
    {
      link: 'https://instagram.com/nainwalsanju?igshid=YmMyMTA2M2Y=',
      icon: 'fa fa-instagram',
      label: 'instagram',
    },
    {
      link: 'https://github.com/nainwalsanju',
      icon: 'fa fa-github',
      label: 'github',
    },
    {
      link: 'https://www.linkedin.com/in/sanjay-nainwal/',
      icon: 'fa fa-linkedin',
      label: 'linkedin',
    },
    // {
    //   link: 'https://twitter.com/nainwalsanju',
    //   icon: 'fa fa-twitter',
    //   label: 'twitter',
    // },
  ],
  bio: "Meet Sanjay Nainwal, a Full Stack Developer (BE-Heavy) with a passion for building scalable web applications. Experienced in Java, WebRTC, and the Spring Framework. Proficient in RESTful API and SOAP API design, working with SQL and Non-SQL databases. Currently an SDE-2 at BharatPe, contributing to the growth and success of a dynamic team. Enjoys traveling and exploring new places. Based in Dehradun, India. Results-driven with a demonstrated ability to develop efficient anomaly detectors and network security solutions. Committed to continuous learning and adapting to new technologies.",
  skills: {
    // you dont havew to strictly follow the 'languages', 'frameworks', 'databases', 'cloudServices', and 'tools' categories. You can add your own if you'd like.
    // but the structure should be the same, an array of strings and the key should be one word, no spaces.
    languages: ['C++','Python','Matlab/Octave','TypeScript', 'JavaScript', 'Java', 'HTML/CSS'],
    frameworks: [
      'React',
      'Angular',
      'Spring Boot',
      'Spring MVC',
      'Django',
      'WebRTC'
    ],
    databases: ['MySQl', 'MongoDB', 'PostgreSQL','Firebase','Redis'],
    cloudServices: ['AWS S3', 'AWS EC2','Google Analytics', 'Vercel'],
    tools: [
      'Git',
      'Postman',
      'Docker',
      'Swagger',
      'Elasticsearch',
      'Maven',
      'Jenkins',
      'Jira',
      'Devtron',
      'Grafana',
      'New-relic',
      'Coralogix',
      'Kafka',
      'BurpSuite',
      'JUnit',
      'TestNG'
    ],
  },
  hobbies: [
    {
      label: 'Video Games',
      emoji: '🎮',
    },
    {
      label: 'Anime',
      emoji: '🎞',
    },
    {
      label: 'Cooking',
      emoji: '🍳',
    },
    {
      label: 'Traveling',
      emoji: '✈️',
    },
    {
      label: 'Photography',
      emoji: '📷',
    },
    // Same as above, change the emojis to match / relate to your hobbies or interests.
    // You can also remove the emojis if you'd like, I just think they look cute :P
  ],
  portfolio: [
    // This is where your portfolio projects will be detailed
    //   for the null ones, the button will not show up
    {
      title: 'CryptoGoGo - Online Cryptocurrency Community and Trading platform',
      live: null, //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
      source: 'https://github.com/Andy8647/CryptoGoGo', // this should be a link to the **repository** of the project, where the code is hosted.
      image: 'https://i.ibb.co/6BsWs6f/01.jpg',
    },
    {
      title: 'Dynrank.js - High-performance dynamic bar chart visualization library',
      live: null,
      source: 'https://github.com/Andy8647/dynrank',
      image: 'https://i.ibb.co/HFkMKtH/02.jpg',
    },
  ],
};
