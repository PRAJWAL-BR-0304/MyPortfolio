
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code2, Download, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { resumeData } from '@/data/resume';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    if (pathname === '/') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        },
        {
          rootMargin: '-30% 0px -70% 0px',
        }
      );

      const sections = navItems
        .map((item) => (item.href.startsWith('#') ? document.querySelector(item.href) : null))
        .filter(Boolean);

      sections.forEach((section) => {
        if (section) observer.observe(section);
      });
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        sections.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    } else {
      setScrolled(true);
      setActiveSection('');
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2
              className={cn(
                'h-6 w-6 text-primary transition-all duration-700 ease-in-out',
                isMounted ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              )}
            />
            <span
              className={cn(
                'hidden font-bold sm:inline-block transition-all duration-700 delay-200 ease-in-out',
                scrolled ? 'text-foreground' : 'text-primary-foreground',
                isMounted
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-3'
              )}
            >
              {resumeData.name}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => {
               const isActive = (item.href.startsWith('#') && activeSection === item.href) || (item.href !=='/' && pathname === item.href);
               const finalHref = item.href.startsWith('#') && pathname !=='/' ? `/${item.href}` : item.href;
              
              return (
                <Link
                  key={item.href}
                  href={finalHref}
                  className={cn(
                    'transition-colors',
                    scrolled
                      ? 'text-foreground/60 hover:text-foreground/80'
                      : 'text-primary-foreground/70 hover:text-primary-foreground',
                    isActive && (scrolled ? 'text-primary' : 'text-primary-foreground font-semibold')
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'transition-colors',
                    !scrolled &&
                      'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <Code2 className="h-6 w-6 text-primary" />
                  <span className="font-bold ml-2">{resumeData.name}</span>
                </Link>
                <Separator className="my-4" />
                <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
                  {navItems.map((item) => {
                     const isActive = (item.href.startsWith('#') && activeSection === item.href) || (item.href !=='/' && pathname === item.href);
                     const finalHref = item.href.startsWith('#') && pathname !=='/' ? `/${item.href}` : item.href;

                    return (
                    <Link
                      key={item.href}
                      href={finalHref}
                      className={cn(
                        'text-lg font-medium text-muted-foreground p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
                        isActive && 'bg-accent text-accent-foreground'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )})}
                   <Separator className="my-2" />
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary">
                      <Link href="/Prajwal_BR_Resume.pdf" download="Prajwal_B_R_Resume.pdf">
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Link>
                    </Button>
                    <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                        <Link href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            My Github
                        </Link>
                    </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                '[&>button]:transition-colors',
                !scrolled &&
                  '[&>button]:text-primary-foreground [&>button:hover]:bg-primary-foreground/10 [&>button:hover]:text-primary-foreground'
              )}
            >
              <ThemeToggle />
            </div>
            <nav className="hidden sm:flex items-center gap-2">
               <Button asChild className="bg-primary text-primary-foreground hover:bg-primary">
                  <Link href="/Prajwal_BR_Resume.pdf" download="Prajwal_B_R_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="bg-foreground text-background hover:bg-foreground/90">
                    <Link href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        My Github
                    </Link>
                </Button>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
