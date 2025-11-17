/** @type {import('next-sitemap').IConfig} */
const siteUrl = "https://halukertekin.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
};
