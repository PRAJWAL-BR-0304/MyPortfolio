
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';
import ContactSection from '@/components/contact-section';
import ExperienceTimeline from '@/components/experience-timeline';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
