# Favicon chuẩn cho TruyenChu.vn

Bộ favicon này bám theo giao diện hiện tại: nền xanh navy, biểu tượng sách trắng, phù hợp với logo ở thanh header.

## File có trong bộ này

- favicon.ico
- favicon.svg
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- icon-64x64.png
- icon-96x96.png
- icon-128x128.png
- icon-256x256.png
- site.webmanifest
- browserconfig.xml
- preview.png

## Cách gắn vào Next.js App Router

Copy toàn bộ file vào thư mục:

```txt
/public
```

Sau đó mở file:

```txt
/app/layout.tsx
```

Thêm hoặc sửa `metadata` như sau:

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TruyenChu.vn - Tóm tắt truyện, review sách",
  description: "Tóm tắt truyện, review sách và khám phá truyện hay mỗi ngày.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#122A5C",
};
```

## Nếu dùng Next.js file-based metadata

Có thể copy thêm:

```txt
/public/favicon.ico  -> /app/favicon.ico
/public/android-chrome-512x512.png -> /app/icon.png
/public/apple-touch-icon.png -> /app/apple-icon.png
```

Nhưng cách dùng `/public` + `metadata.icons` ở trên là rõ ràng và dễ kiểm soát nhất.

## Test sau khi deploy

Mở:

```txt
https://truyenchu.vn/favicon.ico
https://truyenchu.vn/favicon.svg
https://truyenchu.vn/site.webmanifest
```

Nếu trình duyệt vẫn chưa đổi icon, hãy hard refresh hoặc mở tab ẩn danh vì favicon thường bị cache khá lâu.
