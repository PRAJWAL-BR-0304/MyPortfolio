
'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Search, BookText } from 'lucide-react';
import { projects, projectCategories } from '@/data/projects';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (activeFilter !== 'All') {
      if (activeFilter === 'Featured') {
        filtered = filtered.filter((p) => p.featured);
      } else {
        filtered = filtered.filter((p) => p.category === activeFilter);
      }
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(lowercasedTerm) ||
          p.description.toLowerCase().includes(lowercasedTerm) ||
          p.technologies.some((t) => t.toLowerCase().includes(lowercasedTerm))
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={cn(
        'py-16 sm:py-24 bg-secondary/50 opacity-0 transform-gpu transition-all duration-1000 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10'
      )}
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <h2
          id="projects-heading"
          className="text-3xl font-bold text-center mb-4 font-headline"
        >
          My Projects
        </h2>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
              aria-label="Search projects"
            />
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            {projectCategories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? 'default' : 'outline'}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.title} className="group h-80 w-full [perspective:1000px]">
              <div tabIndex={0} className="relative h-full w-full rounded-lg shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                {/* Front side of the card */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <Card className="h-full w-full overflow-hidden bg-background/60 backdrop-blur-lg border-2 border-border/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                      data-ai-hint={project.aiHint}
                    />
                     {project.featured && (
                      <Badge className="absolute top-4 right-4" variant="default">Featured</Badge>
                    )}
                  </Card>
                </div>
                {/* Back side of the card */}
                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <Card className="flex h-full w-full flex-col justify-between overflow-y-auto bg-background/60 backdrop-blur-lg border-2 border-border/20 p-6">
                    <div>
                      <CardHeader className="p-0 mb-2">
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <p className="text-foreground/80 mb-4 text-sm">
                        {project.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/80 text-sm">
                        <Link href={`/projects/${project.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
         {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground col-span-full mt-8">No projects found matching your criteria.</p>
        )}
      </div>
    </section>
  );
}
