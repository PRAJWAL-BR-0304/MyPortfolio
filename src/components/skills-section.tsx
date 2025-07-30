
'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skills, categories } from '@/data/skills';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';


export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const filteredSkills = useMemo(() => {
    if (!searchTerm) return skills;
    return skills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const skillsByCategory = useMemo(() => {
    const grouped: { [key: string]: typeof skills } = { All: filteredSkills };
    categories.slice(1).forEach(category => {
      grouped[category] = filteredSkills.filter(
        skill => skill.category === category
      );
    });
    return grouped;
  }, [filteredSkills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={cn(
        'py-16 sm:py-24 opacity-0 transform-gpu transition-all duration-1000 ease-in-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10'
      )}
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <h2
          id="skills-heading"
          className="text-3xl font-bold text-center mb-12 font-headline"
        >
          Technical Skills
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 px-4">
            <Input
              type="search"
              placeholder="Search for a skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md w-full bg-background/80"
              aria-label="Search skills"
            />
          </div>
          
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 h-auto p-1">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm">{category}</TabsTrigger>
                ))}
              </TabsList>
            </div>
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <Card className="bg-background/60 backdrop-blur-lg border-2 border-border/20 shadow-lg">
                  <CardContent className="p-6 sm:p-10">
                    {skillsByCategory[category].length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
                        {skillsByCategory[category].map((skill, index) => (
                          <div
                            key={skill.name}
                            className="flex flex-col items-center justify-center gap-2 text-center p-2 rounded-lg transition-all duration-300 hover:bg-secondary/60 animate-pulse hover:animate-none"
                            style={{ animationDelay: `${index * 50}ms`, animationDuration: '1.5s' }}
                          >
                            {skill.logo}
                            <p className="font-semibold text-foreground/80 mt-2 text-sm">
                              {skill.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                        <p>No skills match your search.</p>
                        <p className="text-sm">Try clearing the search or selecting a different category.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
