import self from '../img/self.png';
import { colors } from '../colors/mainGradient';
import virtuellyDemo from '../img/virtuelly.png';
import portfolioDemo from '../img/portfolio.png';
import iotDemo from '../img/iot.png';
import driverDemo from '../img/driver.jpg';
import cartoonDemo from '../img/image_processing.jpg';
import cartoon2Demo from '../img/cartoon2.png';
import sherlocDemo from '../img/sherloc.svg';
import txnDetectorDemo from '../img/txn_detector.svg';
import imageProcessingDemo from '../img/image_processing.svg';
import cartoonifyDemo from '../img/cartoonify.svg';
import iotBotnetDemo from '../img/iot_botnet.svg';
import bharatpeRefundDemo from '../img/bharatpe_refund.svg';
import bharatpeRefundServiceDemo from '../img/bharatpe_refund_service.svg';
import iotBotnetDetectionDemo from '../img/iot_botnet_detection.svg';
import driverDrowsinessDemo from '../img/driver_drowsiness.svg';
import cartoonifyImageDemo from '../img/cartoonify_image.svg';
import sherlocRuleEngineDemo from '../img/sherloc_rule_engine.svg';
import imageProcessingUtilsDemo from '../img/image_processing_utils.svg';
import transactionFluctuationDemo from '../img/transaction_fluctuation.svg';

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
      label: '+5 Years Experience'
    },
    {
      label: '10B+ Database Migration'
    },
    {
      label: 'Fintech Specialist'
    },
    {
      label: '5M+ TPS Payment Systems'
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
  bio: "I'm a Backend Engineer focused on building payment systems that scale. Over 5 years, I've shipped production systems processing millions of transactions daily while maintaining 99.95%+ uptime. Specialist in high-throughput distributed systems, fintech infrastructure, database optimization at scale, real-time fraud detection, and microservices architecture. At BharatPe (Series B+ fintech), I led critical infrastructure initiatives: migrated 10B+ payment records to Aurora (50% cost reduction), built a refund service handling 5M+ TPS, and deployed ML-based fraud detection catching 99.9% of suspicious transactions. I'm looking for Senior or Staff Engineer roles in fintech, payments, or high-scale infrastructure. Let's build something that handles billions of dollars in transactions reliably.",
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
      title: 'BharatPe Payment Refund Service',
      problem: 'Manual refund processing took 48 hours, causing customer dissatisfaction and support backlog in a fast-growing fintech platform.',
      description: 'Designed and built an asynchronous, idempotent refund service using Java + Spring Boot, Kafka for event streaming, and MySQL with distributed transactions.',
      tech: ['Java', 'Spring Boot', 'Kafka', 'MySQL', 'Microservices', 'AWS', 'Docker'],
      role: 'Full-stack backend development - architecture, implementation, deployment',
      result: 'Reduced refund processing from 48h to <5min, processes 2M+ daily refunds with 99.95% uptime, zero double-refunds in 2+ years.',
      image: bharatpeRefundServiceDemo,
      featured: true
    },
    {
      title: 'Payments Rule Engine: Sherloc',
      problem: 'Need flexible, real-time decision engine for payment approvals based on complex rules.',
      description: 'Built decision tree rule engine evaluating multiple dimensions: amount, merchant, vendor, velocity.',
      tech: ['Java', 'Spring Boot', 'SQL', 'Redis'],
      role: 'Lead backend developer - architecture design, rule implementation',
      result: 'Processes millions of transactions daily with intelligent blocking of high-risk merchants, 99.99% uptime, reduced fraudulent transactions by 85%.',
      image: sherlocRuleEngineDemo,
      featured: true
    },
    {
      title: 'Transaction Fluctuation & Downtime Detector',
      problem: 'Critical need for real-time monitoring of payment system health to detect anomalies before user impact.',
      description: 'Developed an automated monitoring system that analyzes transaction patterns, detects unusual fluctuations, and alerts on potential downtime scenarios.',
      tech: ['Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'Kibana', 'Prometheus'],
      role: 'Full-stack implementation - anomaly detection algorithms, dashboard development, alerting system',
      result: 'Reduces mean time to detect issues by 90%, proactive identification of 95% of potential downtimes, improved system reliability.',
      image: transactionFluctuationDemo,
      featured: true
    },
    {
      title: 'Virtuelly: Virtual & Hybrid Team Events Platform',
      problem: 'Companies needed low-latency, interactive video conferencing for distributed team events without vendor lock-in or high costs.',
      description: 'Architected a WebRTC-based platform with Node.js backend, Redis for state management, Socket.io for real-time sync, and Docker/AWS containerization. Implemented connection pooling, bandwidth optimization, and auto-scaling.',
      tech: ['WebRTC', 'React', 'Node.js', 'Socket.io', 'AWS', 'Docker'],
      role: 'Full-stack engineer - backend APIs, WebRTC optimization, real-time features',
      result: 'Supports 1000+ concurrent users per session, <200ms latency, 45% user engagement increase.',
      technical_highlights: [
        'WebRTC signaling and peer management at scale',
        'Real-time state synchronization across 1000+ clients',
        'Bandwidth optimization reducing streaming overhead by 30%',
        'Auto-scaling infrastructure on AWS ECS'
      ],
      image: virtuellyDemo,
      liveDemo: 'https://virtuelly.com/',
      featured: true
    },
    {
      title: 'Portfolio Website',
      problem: 'Needed a modern portfolio to showcase backend expertise and attract senior-level fintech recruiters.',
      description: 'Built a responsive, performance-optimized portfolio using React + Next.js + TypeScript with dynamic project cards, automated Lighthouse monitoring, and Vercel deployment.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      role: 'Full design & development',
      result: '90+ Lighthouse score, <1s load time, fully responsive across mobile/tablet/desktop.',
      technical_highlights: [
        'Demonstrates ability to build production-grade frontends alongside backend expertise',
        'Optimizes for Core Web Vitals and SEO'
      ],
      image: portfolioDemo,
      liveDemo: 'https://sanjay-portfolio-two.vercel.app/',
      sourceCode: 'https://github.com/nainwalsanju/sanjay-portfolio',
      featured: true
    },
    {
      title: 'IoT Botnet Attack Detection & Classification',
      problem: 'Detect and classify botnet attacks on IoT devices in real-time for network security',
      description: 'ML-based system to identify malicious IoT behavior patterns',
      tech: ['Python', 'TensorFlow', 'Machine Learning', 'IoT Protocols', 'Data Processing'],
      role: 'End-to-end implementation - data preprocessing, model training, deployment',
      result: '94% accuracy in attack classification, <500ms inference time',
      image: iotBotnetDetectionDemo,
      sourceCode: 'https://github.com/nainwalsanju/IOT-Botnet-attack-Detection-and-classification',
      featured: false
    },
    {
      title: 'Driver Drowsiness Detection System',
      problem: 'Real-time detection of driver fatigue to prevent accidents and save lives',
      description: 'Computer Vision system using eye-tracking and facial analysis',
      tech: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision', 'CNN'],
      role: 'CV pipeline design, model optimization, real-time inference',
      result: '96% accuracy, <100ms detection latency, real-time video processing',
      image: driverDrowsinessDemo,
      sourceCode: 'https://github.com/nainwalsanju/driver-drowsiness-detection'
    },
    {
      title: 'Cartoonify Image using Computer Vision',
      problem: 'Transform photos into cartoon-style artistic images automatically',
      description: 'Image processing and artistic filter application',
      tech: ['Python', 'OpenCV', 'NumPy', 'Image Processing', 'Filters'],
      role: 'Algorithm design and optimization for real-time processing',
      result: 'Processes HD images in <1 second, preserves artistic quality',
      image: cartoonifyImageDemo,
      sourceCode: 'https://github.com/nainwalsanju/cartoonify_project'
    },
    {
      title: 'Image Processing Utilities Library',
      problem: 'Need reusable, well-documented functions for common image processing tasks',
      description: 'Comprehensive library for image manipulation and analysis',
      tech: ['Python', 'NumPy', 'OpenCV', 'pip package'],
      role: 'Library design, implementation, and documentation',
      result: '10+ utility functions, 100% documented, pip-installable',
      image: imageProcessingUtilsDemo,
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
        },
        {
          title: "Microservices Architecture",
          description: "Designed and implemented microservices for payment processing",
          impact: "Improved scalability by 300%, reduced latency by 40%"
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
