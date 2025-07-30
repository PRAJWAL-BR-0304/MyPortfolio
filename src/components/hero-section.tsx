'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Typewriter } from './typewriter';
import { resumeData } from '@/data/resume';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoId = 'eCHaiEjCDFM';

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: '177.77vh', minWidth: '100vw', height: '56.25vw', minHeight: '100vh' }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd1080`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div
        className="relative z-20 container flex flex-col items-center justify-center gap-6 text-center h-full min-h-screen pt-20 pb-10"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline flex items-center justify-center min-h-[6rem] sm:min-h-[8rem]">
          {isMounted ? (
            <Typewriter text={resumeData.headline} speed={100} />
          ) : (
            <span className="opacity-0">{resumeData.headline}</span>
          )}
        </h1>
        <p className="max-w-3xl text-lg text-primary-foreground/80 sm:text-xl">
          I build beautiful, responsive, and performant web applications with a focus on user
          experience and modern design principles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-105"
          >
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-105"
          >
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>
        <div className="absolute bottom-10">
          <Link href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-8 w-8 text-primary-foreground/50 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
