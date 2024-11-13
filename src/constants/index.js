import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  git,
  microservices,
  postgresql,
  restapi,
  regex,
  Freelancer,
  java,
  Angular,
  SpringBoot,
  Hyundai,
  AL,
  albonair,
  visitor,
  htl,
  hinduja,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Frontend Developer',
    icon: frontend,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'UI/UX Design',
    icon: ux,
  },
  {
    title: 'Software Prototyping',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Angular',
    icon: Angular,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Java',
    icon: java,
  },
  {
    name: 'Spring Boot',
    icon: SpringBoot,
  },
  {
    name: 'Rest API',
    icon: restapi,
  },
  {
    name: 'postgresql',
    icon: postgresql,
  },
  {
    name: 'git',
    icon: git,
  },
 
  {
    name: 'Microservices',
    icon: microservices,
  },
];

const experiences = [
  {
    title: 'Freelancer',
    //company_name: 'Cover Hunt',
    icon: Freelancer,
    iconBg: '#333333',
    date: 'Aug 2020 - Present',
  },
  {
    title: 'Junior Developer',
    company_name: 'Vcare Techs',
    icon: regex,
    iconBg: '#333333',
    date: 'Aug 2021 - Sep 2022',
  },
  {
    title: 'Full Stack Developer',
    company_name: 'Hinduja Tech Ltd',
    icon: hinduja,
    iconBg: '#333333',
    date: 'sep 2022 - Oct2024',
  },

];

const projects = [
  {
    id: 'project-1',
    name: 'Hyundai Dealer Management System',
    description: 'Optimizes dealership operations nationwide for new and used vehicles by streamlining sales, service, and scrappage processes across the Hyundai network.',
    roles: [
      'Managed software development lifecycle, from requirements to maintenance',
      'Collaborated with clients to address their Hyundai DMS needs',
      'Developed scalable solutions and conducted testing for high-quality outcomes'
    ],
    demo:"https://ndms.hmil.net/cmm/cmmi/selectLoginMain.dms",
    image:Hyundai,
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'MySQL', 'JSP', 'Kendo UI', 'jQuery'],
  },
  {
    id: 'project-5',
    name: 'Ashok Leyland Innovation Project',
    description: 'An internal initiative for tracking and managing vehicle issues through a diagnostic process, ensuring comprehensive problem resolution.',
    roles: [
      'Troubleshot and fixed backend/frontend issues in existing webpages',
      'Managed Apache server and performed database backups using PuTTY',
      'Handled development tasks and system maintenance for overall stability'
    ],
    image:AL,
    techStack: ['Angular', 'Java', 'Spring MVC', 'iBatis', 'MySQL', 'Apache Server', 'PuTTY'],
  },
  {
    id: 'project-2',
    name: 'Hyundai D2C Click-to-Buy',
    description: 'Enables customers to explore, customize, and purchase vehicles online with real-time inventory, pricing, and financing options for a seamless buying experience.',
    roles: [
      'Developed client-side features with Angular for a dynamic UI',
      'Implemented server-side logic with microservices, Spring Boot, and Hibernate',
      'Collaborated with teams to enhance platform functionality'
    ],
     demo:"https://clicktobuy.hyundai.co.in/#/",
     image:Hyundai,
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'MySQL', 'Angular'],
  },
  {
    id: 'project-3',
    name: 'Albonair India Website',
    description: 'Showcases emission control products and services with a partner login for inventory tracking, sales data management, and service updates.',
    roles: [
      'Built the website from scratch, handling requirements to final implementation',
      'Developed features for partner logins, inventory tracking, and sales management',
      'Ensured seamless user experience and platform functionality'
    ],
    demo:"https://albonair.co.in/",
    image:albonair,
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'React.js','PHP','Microservices'],
  },
  {
    id: 'project-4',
    name: 'Visitors Connect',
    description: 'A web app for managing visitor data and appointments, tracking visitor activities with scheduling and security features for organized processes.',
    roles: [
      'Developed backend from scratch using Java and Spring Boot',
      'Integrated APIs with React.js and used Swagger for documentation',
      'Collaborated with frontend developers and testers for smooth integration'
    ],
    image:visitor,
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'Spring Security', 'React.js', 'MySQL', 'Microservices'],
  },
 
  {
    id: 'project-6',
    name: 'H-MRB App',
    description: 'Developed a global meeting room booking app for Hinduja tech ltd, enabling real-time reservation of vacant rooms across office locations. Features include admin and user modules, location-based search, and automated notifications for unbooked rooms.',
    roles: [
      'Developed backend from scratch using Java and Spring Boot',
      'Integrated APIs with React.js and used Swagger for documentation',
      'Collaborated with frontend developers and testers for smooth integration'
    ],
    image:htl,
    techStack: ['Java', 'Spring Boot', 'Hibernate', 'Spring Security', 'React.js', 'MySQL', 'Swagger'],
  },
  
];


export { services, technologies, experiences, projects };
