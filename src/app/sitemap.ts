
import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = `https://${resumeData.contact.website}`;

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
