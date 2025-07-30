
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { resumeData } from '@/data/resume';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={cn(
        'py-16 sm:py-24 opacity-0 transform-gpu transition-all duration-1000 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10'
      )}
      aria-labelledby="about-heading"
    >
      <div className="container">
        <Card className="max-w-4xl mx-auto bg-background/60 backdrop-blur-lg border-2 border-border/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle id="about-heading" className="text-3xl font-headline">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <Avatar className="h-32 w-32 transition-all duration-700 ease-in-out hover:scale-110 hover:rotate-[360deg]">
                <AvatarImage src="/profile.png" alt={resumeData.name} />
                <AvatarFallback>PBR</AvatarFallback>
              </Avatar>
              <p className="text-lg text-foreground/80 text-center md:text-left">
                {resumeData.summary}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
