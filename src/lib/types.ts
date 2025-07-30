
import type { ReactNode } from 'react';

// Extends the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      type: 'config' | 'event',
      trackingIdOrEventName: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  images: string[];
  aiHint: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  certificateUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  logo: string;
  logoAiHint: string;
  date: string;
  description: string;
}

export interface Skill {
  name: string;
  category: string;
  logo: ReactNode;
}

export interface Education {
  degree: string;
  institution: string;
  major: string;
  gpa: string;
  date: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface ResumeData {
  name: string;
  title: string;
  headline: string;
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Experience[];
  skills: Omit<Skill, 'logo'>[];
  education: Education[];
  certifications: Certification[];
  languages: string[];
}
