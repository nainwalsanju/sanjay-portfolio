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
  position: 'Backend Engineer | Distributed Systems | High-Scale Infrastructure',
  selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
  gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
  baseColor: colors[0],
  miniBio: [
    // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
    {
      emoji: '📍',
      text: 'Dehradun, Uttarakhand, India',
      link: 'https://www.google.com/maps/place/Dehradun,+Uttarakhand/@30.3254026,77.934733,12z/data=!3m1!4b1!4m6!3m5!1s0x390929c356c888af:0x4c3562c032518799!8m2!3d30.3164945!4d78.0321918!16zL20vMDRiejJm?entry=ttu'
    },
    {
      emoji: '💼',
      text: 'Software Development Engineer II @ BharatPe',
      link: 'https://bharatpe.com/'
    },
    {
      emoji: '📧',
      link: 'mailto:sanjaynainwal129@gmail.com',
      text: 'sanjaynainwal129@gmail.com'
    },
  ],
  quickStats: [
    {
      label: '+4 Years Experience',
      icon: '💼'
    },
    {
      label: '10B+ Database Migration',
      icon: '🗄️'
    },
    {
      label: 'Fintech Specialist',
      icon: '💳'
    },
    {
      label: '5M+ TPS Payment Systems',
      icon: '⚡'
    }
  ],
  featuredSkills: [
    {
      category: 'Languages',
      items: ['Java', 'Python', 'JavaScript', 'SQL']
    },
    {
      category: 'Core',
      items: ['Spring Boot', 'Microservices', 'System Design', 'Kafka']
    },
    {
      category: 'Databases',
      items: ['MySQL', 'MongoDB', 'Redis', 'Aurora']
    },
    {
      category: 'Cloud',
      items: ['AWS (EC2, S3)', 'Docker', 'Kubernetes']
    }
  ],
  socials: [
    {
      link: 'https://drive.google.com/file/d/1kLdZWzTeRAAm4QtWrv2UQjHJ-H5ADOgd/view?usp=sharing', // this should be https://yourname.com/resume.pdf once you've deployed
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
    expert: {
      category: 'Expert (5+ years)',
      items: ['Java', 'Spring Boot', 'SQL/MySQL', 'RESTful APIs', 'System Design']
    },
    proficient: {
      category: 'Proficient (2-4 years)',
      items: ['Kafka', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Microservices', 'Database Optimization', 'Payment Systems']
    },
    familiar: {
      category: 'Familiar (Learning/Projects)',
      items: ['Kubernetes', 'GraphQL', 'PostgreSQL', 'React', 'Angular', 'Machine Learning basics']
    }
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
    {
      title: 'Portfolio Website',
      problem: 'Needed a modern portfolio to showcase backend expertise and attract recruiters',
      description: 'Clean, performance-optimized portfolio with responsive design',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      role: 'Full design & development',
      result: '90+ Lighthouse score, <1s load time',
      image: portfolioDemo,
      liveDemo: 'https://sanjay-portfolio-two.vercel.app/',
      sourceCode: 'https://github.com/nainwalsanju/sanjay-portfolio',
      featured: true
    },
    {
      title: 'Virtuelly: Virtual & Hybrid Team Events Platform',
      problem: 'Companies needed interactive, low-latency video conferencing for team events and meetings',
      description: 'Scalable platform supporting thousands of concurrent users with real-time features',
      tech: ['WebRTC', 'React', 'Node.js', 'Socket.io', 'AWS', 'Docker'],
      role: 'Full-stack engineer - backend APIs, WebRTC optimization, real-time features',
      result: 'Supports 1000+ concurrent users per session, <200ms latency',
      image: virtuellyDemo,
      liveDemo: 'https://virtuelly.com/',
      featured: true
    },
    {
      title: 'IoT Botnet Attack Detection & Classification',
      problem: 'Detect and classify botnet attacks on IoT devices in real-time for network security',
      description: 'ML-based system to identify malicious IoT behavior patterns',
      tech: ['Python', 'TensorFlow', 'Machine Learning', 'IoT Protocols', 'Data Processing'],
      role: 'End-to-end implementation - data preprocessing, model training, deployment',
      result: '94% accuracy in attack classification, <500ms inference time',
      image: iotDemo,
      sourceCode: 'https://github.com/nainwalsanju/IOT-Botnet-attack-Detection-and-classification',
      featured: true
    },
    {
      title: 'Driver Drowsiness Detection System',
      problem: 'Real-time detection of driver fatigue to prevent accidents and save lives',
      description: 'Computer Vision system using eye-tracking and facial analysis',
      tech: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision', 'CNN'],
      role: 'CV pipeline design, model optimization, real-time inference',
      result: '96% accuracy, <100ms detection latency, real-time video processing',
      image: driverDemo,
      sourceCode: 'https://github.com/nainwalsanju/driver-drowsiness-detection'
    },
    {
      title: 'Cartoonify Image using Computer Vision',
      problem: 'Transform photos into cartoon-style artistic images automatically',
      description: 'Image processing and artistic filter application',
      tech: ['Python', 'OpenCV', 'NumPy', 'Image Processing', 'Filters'],
      role: 'Algorithm design and optimization for real-time processing',
      result: 'Processes HD images in <1 second, preserves artistic quality',
      image: cartoon2Demo,
      sourceCode: 'https://github.com/nainwalsanju/cartoonify_project'
    },
    {
      title: 'Image Processing Utilities Library',
      problem: 'Need reusable, well-documented functions for common image processing tasks',
      description: 'Comprehensive library for image manipulation and analysis',
      tech: ['Python', 'NumPy', 'OpenCV', 'pip package'],
      role: 'Library design, implementation, and documentation',
      result: '10+ utility functions, 100% documented, pip-installable',
      image: cartoonDemo,
      sourceCode: 'https://github.com/nainwalsanju/image_proceesing_utilities'
    },
  ],
  workExperience: [
    {
      company: "BharatPe - Gurugram (Remote)",
      position: "Software Development Engineer - II",
      duration: "June 2022 - Present",
      achievements: [
        {
          title: "Database Migration",
          description: "Migrated 10B+ records from RDS to Aurora",
          impact: "50% cost reduction, improved query performance by 40%"
        },
        {
          title: "Payment Service Development",
          description: "Built robust payment refund service from scratch",
          impact: "Handles 5M+ transactions per day with 99.95% uptime"
        },
        {
          title: "Real-time Anomaly Detection",
          description: "Deployed ML-based anomaly detector for fraud prevention",
          impact: "Detects 99.9% of suspicious transactions, <200ms latency"
        },
        {
          title: "Production Stability",
          description: "Troubleshot and resolved critical production bugs",
          impact: "Reduced downtime by 60%, improved system reliability"
        },
        {
          title: "API Development & Testing",
          description: "Implemented RESTful APIs with comprehensive unit tests",
          impact: "99%+ test coverage, zero production API failures"
        }
      ],
      techStack: ["Java", "Spring Boot", "Kafka", "MySQL", "Aurora", "AWS", "Redis", "Docker", "Kubernetes", "Elasticsearch", "New Relic"]
    },
    {
      company: "EzeTap by RazorPay - Bangalore (Remote)",
      position: "Software Engineer BackEnd",
      duration: "January 2022 - May 2022",
      achievements: [
        {
          title: "Credit Account Book App",
          description: "Developed full-featured credit management system",
          impact: "Improved order management efficiency by 35%"
        },
        {
          title: "Database Architecture",
          description: "Designed and optimized database schema for scalability",
          impact: "Reduced query time by 50%, improved data consistency"
        },
        {
          title: "Unit Testing",
          description: "Implemented comprehensive unit tests across modules",
          impact: "95%+ code coverage, caught 40+ bugs before production"
        }
      ],
      techStack: ["Java", "Spring Boot", "MySQL", "REST APIs", "JUnit", "Maven"]
    },
    {
      company: "Virtuelly Inc. - Seattle, USA (Remote)",
      position: "Software Development Engineer",
      duration: "April 2021 - January 2022",
      achievements: [
        {
          title: "Low-Latency Video Application",
          description: "Developed and launched interactive video conferencing app",
          impact: "Supports 1000+ concurrent users with <200ms latency"
        },
        {
          title: "UX Enhancement",
          description: "Implemented interaction creation features and REST APIs",
          impact: "User engagement increased by 45%"
        },
        {
          title: "WebRTC Optimization",
          description: "Optimized WebRTC for low-latency, high-quality streaming",
          impact: "Reduced bandwidth usage by 30%"
        }
      ],
      techStack: ["WebRTC", "React", "Node.js", "Socket.io", "REST APIs"]
    },
    {
      company: "Infosys Technologies Ltd. - Bangalore, India",
      position: "System Engineer (Java Developer)",
      duration: "February 2020 - March 2021",
      achievements: [
        {
          title: "Java Development",
          description: "Developed scalable backend services",
          impact: "Shipped 15+ features with zero production issues"
        }
      ],
      techStack: ["Java", "Spring Boot", "MySQL", "REST APIs", "Maven"]
    },
    {
      company: "Infosys Technologies Ltd. - Bangalore, India",
      position: "System Engineer (Trainee)",
      duration: "February 2020 - March 2021",
      achievements: [
        {
          title: "Java Development Training",
          description: "Completed comprehensive Java development training program",
          impact: "Gained expertise in enterprise Java development practices"
        }
      ],
      techStack: ["Java", "Spring Boot", "MySQL", "REST APIs", "Maven"]
    }
  ]
    
};
