import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://store.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/cart/', '/api/'],
    },
    sitemap: `${URL}/sitemap.xml`,
  };
}
