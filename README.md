# TruyenChu.vn Summary Next.js

Bộ code Next.js App Router để giữ cấu trúc URL cũ của `truyenchu.vn`, nhưng chuyển mô hình nội dung sang **tóm tắt truyện / review / ghi chú đọc**, không đăng nguyên văn truyện.

## Chạy thử

```bash
npm install
npm run dev
```

Mở: `http://localhost:3000`

## Cấu trúc chính

```txt
app/
  page.tsx                         # Trang chủ SEO
  [slug]/page.tsx                  # Trang tóm tắt truyện: /ten-truyen
  [slug]/[chapter]/page.tsx        # Trang ghi chú chương: /ten-truyen/chuong-3
  the-loai/[slug]/page.tsx         # Trang thể loại
  danh-sach/[slug]/page.tsx        # Trang danh sách
  tac-gia/[slug]/page.tsx          # Trang tác giả, mặc định noindex nếu chưa đủ dữ liệu
  sitemap.ts                       # Sitemap tự sinh
  robots.ts                        # Robots.txt tự sinh
  apple-app-site-association/route.ts
lib/
  legacy-urls.ts                   # Danh sách URL cũ bạn đã gửi
  data.ts                          # Parse URL, sinh dữ liệu page, phân loại, sitemap
  seo.tsx                          # Metadata, JSON-LD, canonical
components/                        # UI dùng chung
```

## Đổi domain khi deploy

Set biến môi trường:

```bash
NEXT_PUBLIC_SITE_URL=https://truyenchu.vn
```

## Cách thêm URL mới

Thêm URL vào `lib/legacy-urls.ts`, mỗi URL một dòng. Code tự nhận dạng:

- `/ten-truyen`
- `/ten-truyen/chuong-3`
- `/the-loai/slug`
- `/danh-sach/slug`
- `/tac-gia/slug`

## Lưu ý SEO & bản quyền

- Không crawl và đăng full chương truyện.
- Trang truyện nên có tóm tắt, review, motif, nhân vật, ai nên đọc, FAQ.
- Trang chương chỉ nên là ghi chú đọc hoặc tóm tắt ngắn do bạn tự viết.
- Trang tác giả đang để `seoReady: false` vì chưa có dữ liệu thật; khi bổ sung nội dung dày, bật thành `true` trong `lib/data.ts` hoặc chuyển sang CMS.
- Nên thay nội dung auto bằng nội dung biên tập riêng cho các trang quan trọng trước khi đẩy index hàng loạt.

## Gợi ý nối CMS sau này

Khi có database/CMS, thay phần build data trong `lib/data.ts` bằng fetch từ API hoặc query database. Giữ nguyên các route trong `app/` là được.
