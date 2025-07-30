
import type { Skill } from '@/lib/types';
import Image from 'next/image';

export const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'Languages', logo: <Image src="/images/skills/java.png" alt="Java logo" width={48} height={48} /> },
  { name: 'C', category: 'Languages', logo: <Image src="/images/skills/c.png" alt="C logo" width={48} height={48} /> },
  { name: 'Python', category: 'Languages', logo: <Image src="/images/skills/python.png" alt="Python logo" width={48} height={48} /> },
  { name: 'JavaScript', category: 'Languages', logo: <Image src="/images/skills/javascript.png" alt="JavaScript logo" width={48} height={48} /> },
  { name: 'TypeScript', category: 'Frontend', logo: <Image src="/images/skills/typescript.png" alt="TypeScript logo" width={48} height={48} /> },

  // Frontend
  { name: 'React', category: 'Frontend', logo: <Image src="/images/skills/react.png" alt="React logo" width={48} height={48} /> },
  { name: 'Next.js', category: 'Frontend', logo: <Image src="/images/skills/nextjs.png" alt="Next.js logo" width={48} height={48} /> },
  { name: 'Tailwind CSS', category: 'Frontend', logo: <Image src="/images/skills/tailwind.png" alt="Tailwind CSS logo" width={48} height={48} /> },
  
  // Backend
  { name: 'Django', category: 'Backend', logo: <Image src="/images/skills/django.png" alt="Django logo" width={48} height={48} /> },
  { name: 'Express.js', category: 'Backend', logo: <Image src="/images/skills/express.png" alt="Express.js logo" width={48} height={48} /> },

  // Databases
  { name: 'MySQL', category: 'Databases', logo: <Image src="/images/skills/mysql.png" alt="MySQL logo" width={48} height={48} /> },
  { name: 'MongoDB', category: 'Databases', logo: <Image src="/images/skills/mongodb.png" alt="MongoDB logo" width={48} height={48} /> },
  { name: 'PostgreSQL', category: 'Databases', logo: <Image src="/images/skills/postgresql.png" alt="PostgreSQL logo" width={48} height={48} /> },

  // Tools
  { name: 'DSA', category: 'Tools', logo: <Image src="/images/skills/dsa.png" alt="DSA logo" width={48} height={48} /> },
  { name: 'IoT', category: 'Tools', logo: <Image src="/images/skills/iot.png" alt="IoT logo" width={48} height={48} /> },
  { name: 'AI/ML', category: 'Tools', logo: <Image src="/images/skills/ai-ml.png" alt="AI/ML logo" width={48} height={48} /> },
];

export const categories: string[] = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools'];
