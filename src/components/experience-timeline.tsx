
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { experience } from '@/data/experience';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Animate the line
      if (lineRef.current && timelineContainerRef.current) {
        const timelineHeight = timelineContainerRef.current.clientHeight;
        lineRef.current.style.height = `${timelineHeight}px`;
      }
      // Animate the cards
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          setTimeout(() => {
            ref.classList.remove('opacity-0', 'translate-x-10');
            ref.classList.add('opacity-100', 'translate-x-0');
          }, index * 200);
        }
      });
    }
  }, [isVisible]);

  return (
    <section id="experience" ref={sectionRef} className="py-16 sm:py-24" aria-labelledby="experience-heading">
      <div className="container">
        <h2 id="experience-heading" className="text-3xl font-bold text-center mb-12 font-headline">My Experience</h2>
        <div ref={timelineContainerRef} className="relative max-w-2xl mx-auto pl-8">
          {/* Background Line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border/20 ml-4"></div>
          {/* Animated Progress Line */}
          <div ref={lineRef} className="absolute left-0 top-0 w-0.5 bg-primary ml-4 transition-all ease-out duration-2000" style={{ height: '0px' }}></div>

          {experience.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="relative mb-12 opacity-0 translate-x-10 transition-all duration-700 ease-out"
            >
              {/* Dot on the timeline */}
              <div className="absolute -left-4 top-1.5 w-16 h-16 rounded-full bg-secondary flex items-center justify-center z-10 transform -translate-x-1/2 p-1 overflow-hidden ring-4 ring-background">
                <Image
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={128}
                  height={128}
                  className="rounded-full object-contain"
                  data-ai-hint={item.logoAiHint}
                />
              </div>
              
              <Card className="bg-background/60 backdrop-blur-lg border-2 border-border/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
                <CardHeader>
                  <CardTitle>{item.role}</CardTitle>
                  <CardDescription className="font-semibold">{item.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <p className="text-foreground/80">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
