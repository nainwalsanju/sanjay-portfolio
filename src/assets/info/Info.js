import self from '../img/self.png';
import { colors } from '../colors/mainGradient';
import virtuellyDemo from '../img/virtuelly.png';
import portfolioDemo from '../img/portfolio.png';
import iotDemo from '../img/iot.png';
import driverDemo from '../img/driver.jpg';
import cartoonDemo from '../img/image_processing.jpg';
import cartoon2Demo from '../img/cartoon2.png';

export const info = {
  firstName: 'Sanjay',
  lastName: 'Nainwal',
  initials: 'SN', // the example uses first and last, but feel free to use three or more if you like.
  position: 'Backend Developer',
  selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
  gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
  baseColor: colors[0],
  miniBio: [
    // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
    {
      emoji: '🇮🇳',
      text: 'Based in Dehardun, India',
      link: 'https://www.google.com/maps/place/Dehradun,+Uttarakhand/@30.3254026,77.934733,12z/data=!3m1!4b1!4m6!3m5!1s0x390929c356c888af:0x4c3562c032518799!8m2!3d30.3164945!4d78.0321918!16zL20vMDRiejJm?entry=ttu'
    },
    {
      emoji: '💻',
      text: 'Software Development Engineer II at BharatPe',
      link: 'https://bharatpe.com/'
    },
    {
      emoji: '📧',
      link: 'mailto:sanjaynainwal129@gmail.com',
      text: 'sanjaynainwal129@gmail.com'
    },
  ],
  socials: [
    {
      link: 'https://drive.google.com/file/d/1DFgiZABKJtT2RbzHSuf8bgFG8QIZeKyf/view?usp=sharing', // this should be https://yourname.com/resume.pdf once you've deployed
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
    {
      link: 'https://twitter.com/sanjay__nainwal',
      icon: 'fa fa-twitter',
      label: 'twitter',
    },
    {
      link: 'https://leetcode.com/sanjay_nainwal/',
      icon: 'fa fa-code',
      label: 'leetcode',
    },
    {
      link: 'https://stackoverflow.com/users/12658226/sanjay-nainwal',
      icon: 'fa fa-stack-overflow',
      label: 'stack-overflow',
    },
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
      title: 'Portfolio-Website',
      live: 'https://sanjay-portfolio-two.vercel.app/',
      source: 'https://github.com/nainwalsanju/sanjay-portfolio',
      image: portfolioDemo,
    },
    {
      title: 'IOT-Botnet-Attack-Detection-And-Classification',
      live: null,
      source: 'https://github.com/nainwalsanju/IOT-Botnet-attack-Detection-and-classification',
      image: iotDemo,
    },
    {
      title: 'Driver-drowsiness-detection',
      live: null,
      source: 'https://github.com/nainwalsanju/driver-drowsiness-detection',
      image: driverDemo,
    },
    {
      title: 'Virtuelly-The best virtual, hybrid and in-person team events',
      live: 'https://virtuelly.com/', //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
      image: virtuellyDemo,
    },
    {
      title: 'Cartoonify image using Computer Vision',
      live: null,
      source: 'https://github.com/nainwalsanju/cartoonify_project',
      image: cartoon2Demo,
    },
    {
      title: 'Image Processing Utilities',
      live: null,
      source: 'https://github.com/nainwalsanju/image_proceesing_utilities',
      image: cartoonDemo,
    },
  ],
  workExperience: [
    {
      company: "BharatPe - Gurugram (Remote)",
      position: "Software Development Engineer - II",
      duration: "June 2022 - Present",
      description: [
        "Migrated Database with data of 10 Billion+ records from RDS to Aurora.",
        "Created and developed a robust payment service from scratch, encompassing refund functionalities and payment links for seamless financial transactions.",
        "Deployed and maintained a real-time anomaly detector for transaction behavior analysis, ensuring system security and integrity with an alert system for timely response.",
        "Collaborated with the team to troubleshoot and resolve production bugs, minimizing downtime and ensuring smooth operations.",
        "Implemented RESTful APIs, conducted thorough unit testing, and utilized a robust tech stack including Java 8, MySQL, Kafka, Spring Boot, Redis, Kubernetes, and Jenkins for delivering high-quality and secure applications.",
      ],
    },
    {
      company: "EzeTap by RazorPay - Bangalore (Remote)",
      position: "Software Engineer BackEnd",
      duration: "January 2022 - May 2022",
      description: [
        "Developed Credit Account book app with improved order and review management.",
        "Designed and implemented efficient database architecture.",
        "Conducted rigorous unit testing for high-quality and secure application.",
      ],
    },
    {
      company: "Virtuelly Inc. - Seattle, USA (Remote)",
      position: "Software Development Engineer",
      duration: "April 2021 - January 2022",
      description: [
        "Developed and launched an interactive low latency video conferencing application with multiple interactive environments.",
        "Developed and improved UX by implementing Interaction Creation Feature, REST APIs, and integrating payment gateways for Virtuelly Website providing entertainment experiences in production environment.",
      ],
    },
    {
      company: 'Infosys Technologies Ltd.',
      position: 'System Engineer (Java Developer)',
      duration: 'February 2020 - March 2021',
      description: [
        'Worked as a System Engineer (Java Developer) at Infosys Technologies Ltd.',
      ],
    },
    {
      company: 'Infosys Technologies Ltd.',
      position: 'System Engineer (Trainee)',
      duration: 'February 2020 - March 2021',
      description: [
        'Worked as a System Engineer (Trainee) at Infosys Technologies Ltd.',
      ],
    },
    // Add more work experience items here if needed
  ]
    
};
