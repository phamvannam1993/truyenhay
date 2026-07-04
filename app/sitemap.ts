import type { MetadataRoute } from "next";
import { getSitemapItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { absolute } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapItems().map((item) => {
    const changeFrequency = item.path === "/" ? ("daily" as const) : ("weekly" as const);

    return {
      url: absolute(item.path, siteConfig.url),
      lastModified: new Date(item.updatedAt),
      changeFrequency,
      priority: item.priority,
    };
  });
}
