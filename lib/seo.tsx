import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absolute, clampText } from "@/lib/utils";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/og-default.svg",
  noIndex = false,
  publishedTime,
  modifiedTime,
  keywords = [],
}: SeoInput): Metadata {
  const url = absolute(path, siteConfig.url);
  const ogImage = absolute(image, siteConfig.url);
  const safeDescription = clampText(description, 155);

  const openGraph = type === "article"
    ? {
        type: "article" as const,
        title,
        description: safeDescription,
        url,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        publishedTime,
        modifiedTime,
      }
    : {
        type: "website" as const,
        title,
        description: safeDescription,
        url,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      };

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      absolute: title,
    },
    description: safeDescription,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [ogImage],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absolute("/favicon/icon-256x256.png", siteConfig.url),
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "vuontrithuviet@gmail.com",
      url: absolute("/lien-he", siteConfig.url),
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "vi-VN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tim-kiem?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path, siteConfig.url),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    inLanguage: "vi-VN",
    mainEntityOfPage: absolute(input.path, siteConfig.url),
    datePublished: input.datePublished || input.dateModified,
    dateModified: input.dateModified,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}

export function collectionJsonLd(input: {
  title: string;
  description: string;
  path: string;
  items: Array<{ title: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.title,
    description: input.description,
    url: absolute(input.path, siteConfig.url),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.slice(0, 30).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: absolute(item.path, siteConfig.url),
      })),
    },
  };
}
