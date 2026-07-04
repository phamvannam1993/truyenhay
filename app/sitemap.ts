import type { MetadataRoute } from "next";
import { getSitemapItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { absolute } from "@/lib/utils";

const UPDATED_AT = "2026-07-04";

type SitemapEntry = MetadataRoute.Sitemap[number];

const staticPages: Array<{
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
}> = [
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

function changeFreqFor(priority: number): SitemapEntry["changeFrequency"] {
  if (priority >= 0.9) return "daily";
  if (priority >= 0.7) return "weekly";
  if (priority >= 0.5) return "monthly";
  return "yearly";
}

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function toDate(value?: string | Date): Date {
  const date = value ? new Date(value) : new Date(UPDATED_AT);
  return Number.isNaN(date.getTime()) ? new Date(UPDATED_AT) : date;
}

function dedupeSitemap(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const map = new Map<string, SitemapEntry>();

  for (const entry of entries) {
    const key = normalizeUrl(entry.url);

    const existing = map.get(key);

    if (!existing) {
      map.set(key, entry);
      continue;
    }

    const existingTime = existing.lastModified
      ? new Date(existing.lastModified).getTime()
      : 0;

    const currentTime = entry.lastModified
      ? new Date(entry.lastModified).getTime()
      : 0;

    // Nếu trùng URL thì giữ bản mới hơn.
    // Nếu cùng ngày thì giữ bản có priority cao hơn.
    if (
      currentTime > existingTime ||
      (currentTime === existingTime && (entry.priority ?? 0) > (existing.priority ?? 0))
    ) {
      map.set(key, entry);
    }
  }

  return Array.from(map.values());
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dataEntries: MetadataRoute.Sitemap = getSitemapItems().map((item) => ({
    url: absolute(item.path, siteConfig.url),
    lastModified: toDate(item.updatedAt),
    changeFrequency: changeFreqFor(item.priority),
    priority: item.priority,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absolute(page.path, siteConfig.url),
    lastModified: toDate(UPDATED_AT),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return dedupeSitemap([...dataEntries, ...staticEntries]);
}
