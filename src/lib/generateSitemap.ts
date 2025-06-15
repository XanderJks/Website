import { supabase } from './supabase';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function generateSitemap(): Promise<string> {
  const baseUrl = 'https://jonkersai.nl';
  const urls: SitemapUrl[] = [];

  // Static pages
  urls.push(
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/book-demo`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    }
  );

  // Dynamic blog posts
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .lt('published_at', new Date().toISOString());

    if (posts) {
      posts.forEach(post => {
        urls.push({
          loc: `${baseUrl}/blog/${post.slug}`,
          lastmod: (post.updated_at || post.published_at).split('T')[0],
          changefreq: 'monthly',
          priority: 0.6
        });
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}