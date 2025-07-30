
import type { Project } from '@/lib/types';

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const baseProjects: Omit<Project, 'slug' | 'certificateUrl'>[] & { certificateUrl?: string }[] = [
  {
    title: 'De-Fi Homes: Real Estate DApp',
    category: 'Web3',
    description: 'A blockchain-powered real estate auction platform for secure crypto bidding.',
    longDescription: 'De-Fi Homes is a decentralized application that bridges traditional real estate with Web3 technology. It provides a platform for property investments using secure crypto bidding via MetaMask. Built with React, Supabase, and TypeScript, it offers a transparent and global marketplace for property transactions on the Ethereum blockchain.',
    image: '/images/projects/defihomes-thumb.png',
    images: ['/images/projects/defihomes-1.png', '/images/projects/defihomes-2.png'],
    aiHint: 'blockchain real estate',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'MetaMask', 'Ethereum', 'Chart.js', 'Framer Motion'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'AI Grammar Corrector',
    category: 'Web App',
    description: 'An AI-powered platform providing real-time grammar and clarity suggestions.',
    longDescription: 'This AI-powered grammar correction website was developed with Express.js and integrates with the OpenAI GPT API. It provides users with real-time suggestions to improve sentence structure, clarity, and overall writing accuracy. The goal was to create a tool that aids users in producing error-free content efficiently.',
    image: '/images/projects/grammar-thumb.png',
    images: ['/images/projects/grammar-1.png', '/images/projects/grammar-2.png'],
    aiHint: 'ai writing assistant',
    technologies: ['Express.js', 'HTML', 'CSS', 'OpenAI GPT'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'Django Student Management System',
    category: 'Web App',
    description: 'A web-based role-based student management system built using Django.',
    longDescription: 'A web-based role-based student management system built using Django. This system supports different panels for Admin, HOD, Staff, and Student users with complete authentication and dashboard features. It includes profile picture support, a modular app structure, and dashboards for user actions.',
    image: '/images/projects/student-management-thumb.png',
    images: ['/images/projects/student-management-1.png'],
    aiHint: 'student management',
    technologies: ['Django', 'Python', 'SQLite', 'Pillow', 'Supabase'],
    liveUrl: '#',
    githubUrl: 'https://github.com/prajwalbr/Student-Management-System',
    featured: false,
  },
  {
    title: 'Thought-Based Website',
    category: 'Web App',
    description: 'A secure web platform for organizing personal thoughts and notes.',
    longDescription: 'A web platform for securely storing and organizing thoughts and notes, developed using Django, HTML, CSS, and JavaScript. It utilizes AWS for database storage and is deployed via the Render service, ensuring scalability and reliability. The platform is designed to improve note organization and provide easy access to personal thoughts.',
    image: '/images/projects/notes-thumb.png',
    images: ['/images/projects/notes-1.png'],
    aiHint: 'notes application',
    technologies: ['Django', 'HTML', 'CSS', 'JavaScript', 'AWS', 'Render'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    title: 'Baby Monitoring System',
    category: 'IoT',
    description: 'An embedded system for real-time monitoring of an infant\'s health and safety. Project research paper was published in an IEEE conference.',
    longDescription: 'This project is an embedded system designed for the real-time monitoring of a baby\'s health and safety. The system was simulated and designed in Proteus Software and programmed using Embedded C. It enhances caregiving by providing timely alerts, ensuring infant safety through continuous monitoring. The project research paper was published in an IEEE conference.',
    image: '/images/projects/thumb-iot.png',
    images: ['/images/projects/iot-1.png'],
    aiHint: 'iot sensor',
    technologies: ['Embedded C', 'Proteus', 'Real-time Systems'],
    liveUrl: 'https://ieeexplore.ieee.org/abstract/document/10823361',
    githubUrl: '#',
    featured: false,
    certificateUrl: '/images/projects/iot-1.png',
  },
];

export const projects: Project[] = baseProjects.map(p => ({
  ...p,
  slug: slugify(p.title),
}));

export const projectCategories = ['All', 'Featured', 'Web App', 'Web3', 'IoT'];
