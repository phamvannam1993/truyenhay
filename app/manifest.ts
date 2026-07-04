import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} - Tóm tắt truyện`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf2",
    theme_color: "#8a4f23",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
