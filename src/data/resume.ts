
import type { ResumeData } from '@/lib/types';
import { experience } from './experience';
import { skills } from './skills';

export const resumeData: ResumeData = {
  name: 'PRAJWAL B R',
  title: 'Software Developer and AI enthusiast',
  headline: 'Software Developer and AI enthusiast',
  contact: {
    email: 'prajwalbr0304@gmail.com',
    phone: '+916363450449',
    website: 'prajwalbr.dev',
    linkedin: 'www.linkedin.com/in/prajwal-reddy-34024b307',
    github: 'github.com/PRAJWAL-BR-0304',
  },
  summary: 'Software Developer and AI enthusiast. Proficient in building end-to-end solutions from front-end interfaces to back-end services and database management. Adept at integrating AI/ML models and tackling complex technical challenges to deliver scalable, user-friendly applications.',
  experience: experience,
  skills: skills
    .filter(s => ['Languages', 'Frontend', 'Backend', 'Databases', 'Tools'].includes(s.category))
    .map(({ name, category }) => ({ name, category })),
  education: [
    {
      degree: 'Bachelor of Technology',
      institution: 'Dayananda Sagar University',
      major: 'Major in Computer Science and Engineering',
      gpa: '8.74/10',
      date: 'Expected 2026',
    },
  ],
  certifications: [
    { name: 'Artificial Intelligence', issuer: 'IBM skills build CSRBOX' },
    { name: 'Django', issuer: 'Udemy' },
  ],
  languages: ['English', 'Kannada', 'Hindi'],
};
