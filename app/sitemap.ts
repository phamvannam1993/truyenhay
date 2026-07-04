import type { MetadataRoute } from "next";
import { getSitemapItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { absolute } from "@/lib/utils";

const UPDATED_AT = "2026-07-04";

// Trang tĩnh không nằm trong data collections (trang chủ đã có trong getSitemapItems)
const staticPages: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/the-loai", priority: 0.9, changeFrequency: "weekly" },
  { path: "/danh-sach/truyen-moi", priority: 0.9, changeFrequency: "daily" },
  { path: "/danh-sach/truyen-hot", priority: 0.9, changeFrequency: "daily" },
  { path: "/tim-kiem", priority: 0.6, changeFrequency: "weekly" },
  { path: "/gioi-thieu", priority: 0.6, changeFrequency: "monthly" },
  { path: "/huong-dan-su-dung", priority: 0.6, changeFrequency: "monthly" },
  { path: "/cau-hoi-thuong-gap", priority: 0.6, changeFrequency: "monthly" },
  { path: "/lien-he", priority: 0.5, changeFrequency: "yearly" },
  { path: "/chinh-sach-bao-mat", priority: 0.5, changeFrequency: "yearly" },
];

function changeFreqFor(priority: number): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (priority >= 0.9) return "daily";
  if (priority >= 0.7) return "weekly";
  if (priority >= 0.5) return "monthly";
  return "yearly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dataEntries: MetadataRoute.Sitemap = getSitemapItems().map((item) => ({
    url: absolute(item.path, siteConfig.url),
    lastModified: new Date(item.updatedAt),
    changeFrequency: changeFreqFor(item.priority),
    priority: item.priority,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absolute(page.path, siteConfig.url),
    lastModified: new Date(UPDATED_AT),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...dataEntries, ...staticEntries];
}
