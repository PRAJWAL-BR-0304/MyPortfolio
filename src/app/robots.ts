
import { MetadataRoute } from 'next';
import { resumeData } from '@/data/resume';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = `https://${resumeData.contact.website}`;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
