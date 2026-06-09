import { MetadataRoute } from "next";
import { posts } from "./lib/posts";
import { medidas } from "./lib/oportunidades";
import { SITE_URL as BASE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const radarRoutes = medidas.map((m) => ({
    url: `${BASE_URL}/oportunidades/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/oportunidades`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...radarRoutes,
    ...blogRoutes,
  ];
}
