/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blackbullslab.com',
  generateRobotsTxt: true,
  sitemapSize: 99999,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*', '/api/*', '/checkout', '/checkout/*'],
  priority: 0.7,
  changefreq: 'weekly',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api', '/checkout'] },
    ],
  },
  transform: async (config, path) => {
    let priority = config.priority;
    if (path === '/') priority = 1.0;
    if (path.startsWith('/format')) priority = 0.9;
    if (path.startsWith('/events')) priority = 0.8;
    if (path.startsWith('/talents')) priority = 0.8;
    if (path.startsWith('/blog')) priority = 0.8;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
