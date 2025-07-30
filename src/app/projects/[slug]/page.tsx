
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookText, Github, FileText } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Breadcrumb } from '@/components/breadcrumb';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  const siteUrl = `https://${resumeData.contact.website}`;
  const ogImageUrl = project.images[0] ? `/${project.images[0]}` : `https://placehold.co/1200x630.png`;


  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 600,
          alt: project.title,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImageUrl],
    }
  };
}


export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="bg-card/50 backdrop-blur-lg border border-border/20 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 font-headline">{project.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{project.category}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <Carousel className="w-full max-w-4xl mx-auto px-12 pb-8">
              <CarouselContent>
                {project.images.map((img, index) => (
                  <CarouselItem key={index}>
                      <div className="relative aspect-video w-full">
                          <Image
                          src={img}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="rounded-lg object-cover border"
                          data-ai-hint={project.aiHint}
                          />
                      </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          <div className="p-6 md:p-8 border-t border-border/20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 font-headline">About this project</h2>
              <p className="text-foreground/80 leading-relaxed mb-8">{project.longDescription}</p>

              <h3 className="text-xl font-bold mb-4 font-headline">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {project.githubUrl && project.githubUrl !== '#' && (
                  <Button asChild variant="secondary">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                )}
                 {project.liveUrl && project.liveUrl !== '#' && (
                  <Button asChild variant="outline">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <BookText className="mr-2 h-4 w-4" />
                      View Publication
                    </Link>
                  </Button>
                )}
                {project.certificateUrl && (
                  <Button asChild variant="outline">
                    <Link href={project.certificateUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      View Certificate
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
