
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';
import { resumeData } from '@/data/resume';

export default function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.</p>
        <nav className="flex items-center gap-2" aria-label="Social media links">
          {resumeData.contact.github && (
            <Button asChild variant="ghost" size="icon">
              <Link href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="icon">
            <Link href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </nav>
      </div>
    </footer>
  );
}
