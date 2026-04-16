/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blackbullslab.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  // Incrementing priority for core marketing pages
  priority: 0.7,
  changefreq: 'weekly',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
    additionalSitemaps: [
      'https://blackbullslab.com/sitemap.xml',
    ],
  },
  // Ensure dynamic routes are included (crawled during build)
  transform: async (config, path) => {
    // Custom logic for priority
    let priority = config.priority;
    if (path === '/') priority = 1.0;
    if (path.startsWith('/format')) priority = 0.9;
    if (path.startsWith('/blog')) priority = 0.8;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
