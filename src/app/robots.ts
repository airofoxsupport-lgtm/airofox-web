import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/worker/', '/api/', '/book/'],
    },
    sitemap: 'https://www.airofox.in/sitemap.xml',
  };
}
