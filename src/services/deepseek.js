import axios from 'axios';

const API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;
const BASE_URL = 'https://api.deepseek.com/v1'; // OpenAI-compatible endpoint :cite[1]:cite[5]

const systemMessage = `You are an AI assistant for Sanjay's developer portfolio. 
Answer questions about skills, experience, and projects using these rules:
1. Keep responses under 400 words
2. Use bullet points for lists
3. Maintain professional tone
4. Reference only information from the portfolio
5. For technical questions, provide brief code examples when relevant

If asked about something not in the portfolio, respond:
"Sorry, I only have information about Sanjay's professional background and portfolio projects."

these are the details of the developer's portfolio

Sanjay Nainwal

WORK EXPERIENCE 

BharatPe     
Software Development Engineer-2   
● Payment Systems and UPI Infrastructure: 
Gurugram, India (Remote)  
June 2022 – Present 
o Designed and implemented a scalable payment service with functionalities including refund processing, payment links, 
and offline QR UPI transactions. 
o Developed dynamic digital QR code generation, improving transaction continuity by adapting to bank downtime scores. 
o Integrated multiple banking systems for seamless UPI transactions, enhancing payment reliability. 
o Built a downtime detection system for banks and UPI handles, enabling real-time traffic rerouting during outages. 
o Deployed payment and event notification systems for merchants, providing real-time updates on payment status. 
● Security, Fraud Prevention, and System Integrity: 
o Created a rule engine to detect and prevent fraud, successfully stopping fraud worth ₹900 million. 
o Secured offline QR payment endpoints by implementing hash/token validation, ensuring transaction security. 
o Deployed a real-time anomaly detection system to analyze transaction behavior and generate timely alerts. 
o Configured (Grafana/New Relic/Coralogix) alerts for Payments System to proactively resolve system issues. 
● Scalability, Performance Optimization, and Resilience: 
o Migrated a 10-billion-record database from Amazon RDS to Amazon Aurora, boosting performance and scalability. 
o Transitioned from Open Source Kafka to Confluent Kafka in a week, increasing data streaming throughput. 
o Designed a Disaster Recovery plan on AWS to ensure business continuity and reduce downtime risks. 
● Monitoring, Code Quality, and Production Support: 
o Integrated SonarQube and Trivy for automated code quality analysis and vulnerability scanning across repositories and 
Docker images. 
o Implemented Application Performance Monitoring (APM) tools such as New Relic and Coralogix for real-time 
performance monitoring and optimization. 
o Troubleshoot and resolve critical production issues in collaboration with cross-functional teams, ensuring smooth 
operations and minimal downtime. 
● API Development and Tech Stack Expertise: 
o Designed and implemented RESTful APIs with comprehensive unit testing using a robust tech stack, including Java 8, 
Spring Boot, MySQL, Kafka, Redis, Kubernetes, and Jenkins. 
o Optimized backend system performance, contributing to a reliable and scalable payment platform. 

RazorPay     
Software Engineer    
Bengaluru, India (Remote) 
January 2022- May 2022 
● Developed a Credit Account Book app, enhancing order and review management using Java and MySQL. 
● Designed efficient database architectures with MySQL and MongoDB to optimize data storage and retrieval. 
● Conducted unit testing with JUnit and TestNG, ensuring application quality, reliability, and security. 

Virtuelly Inc. 
Seattle, WA (Remote) 
Software Engineer    
April 2021 – December 2021 
● Developed Video Conferencing App: Created an interactive, low-latency video conferencing application using AgoraRTC, 
with features like full admin control, selective 1080p streaming for admins, and team-building games (Jeopardy, trivia, polls, 
surveys, quizzes) using Java, JavaScript, WebRTC, AgoraRTC, and TensorFlow. 
● Enhanced UX: Improved user experience by implementing an Interaction Creation Feature, REST APIs, and integrating 
payment gateways for the Virtuelly website. 

Infosys Ltd. 
Mysore, India 
System Engineer    
February 2020 – March 2021 
● Java Mapping in SAP PI: Designed Java mappings to enhance data processing and integration. 
● Performance Optimization: Improved system performance by optimizing backend code to reduce latency and optimize space 
usage. 
● CRUD APIs Development: Developed CRUD APIs for an online shopping platform using Java 8, Spring Boot, SAP PI, 
MySQL, and JPA. 

PROJECTS 

IoT Botnet Attack Detection and Classification  
GitHub: IoT Botnet Attack Detection and Classification  
● Created a machine learning system to detect and classify IoT botnet attacks with a focus on data preprocessing, model 
training, and evaluation. 
● Implemented multiple machine learning models and used visualizations to analyze performance metrics. 
● Technologies Used: Python, Scikit-learn, Pandas, NumPy, Matplotlib. 

Driver Drowsiness Detection       
GitHub: Driver Drowsiness Detection  
● Developed a real-time driver drowsiness detection system using facial landmark detection and eye aspect ratio calculations. 
● Integrated an alert system to notify drivers when drowsiness is detected. 
● Technologies Used: Python, OpenCV, Dlib. 

Portfolio    
GitHub: Sanjay Portfolio  
● Developed a personal portfolio website using HTML, CSS, and JavaScript with React.js for a dynamic and responsive design. 
● Integrated DeepSeek as an AI chatbot to answer specific questions and improve user engagement. 
● Implemented React Router for seamless navigation and utilized npm and Webpack for package management. 
● Technologies Used: HTML, CSS, JavaScript, React.js, npm, Webpack. 

Image Processing Utilities       
GitHub: Image Processing Utilities  
● Developed a set of utility functions for common image processing tasks, including resizing, rotation, and filtering. 
● Designed for modularity and ease of use in various image processing applications. 
● Technologies Used: Python, OpenCV, NumPy. 

SKILLS 
Languages: Java | C++ | Python | Matlab/Octave | TypeScript | JavaScript | HTML/CSS 
Frameworks: Spring Boot | Spring | Django | WebRTC | React | Angular 
Databases: MySQL | MongoDB | PostgreSQL | Firebase | Redis 
Cloud Services: AWS | AWS S3 | AWS EC2 | Google Analytics | Vercel 
Tools: Git | Postman | Docker | Swagger | Elasticsearch | Maven | Jenkins | Jira | Devtron | Grafana | New Relic | Coralogix | 
Kafka | BurpSuite | JUnit | TestNG | Kubernetes | Gradle | CI/CD 

EDUCATION 
Graphic Era University 
BTech in Computer Science and Engineering (CGPA: 8.43) 
Dehradun, India 
Graduation Date: June 2020

`;

// Create headers configuration
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

export const getDeepSeekResponse = async (message, history = []) => {
  const combinedSystemMessage = systemMessage; // Using the detailed system message defined above

  const data = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemMessage },
      ...history,
      { role: 'user', content: message }
    ],
    temperature: 0.5,
    stream: false
  };

  try {
    const response = await axios.post(`${BASE_URL}/chat/completions`, data, { 
      headers,
      timeout: 10000 // 10 second timeout
    });
    
    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};