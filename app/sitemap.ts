import { MetadataRoute } from "next";

const siteUrl = "https://gracejeanne.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
    ["", "weekly", 1.0],
    ["/galleries", "weekly", 0.9],
    ["/shop", "weekly", 0.9],
    ["/about", "monthly", 0.6],
    ["/contact", "yearly", 0.5],
  ];

  return pages.map(([path, changeFrequency, priority]) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
