# Cách sửa dữ liệu giao diện

Các dữ liệu chính đã được tách ra thư mục:

```txt
data/truyenchu/
```

## 1. Sửa danh mục thể loại

File:

```txt
data/truyenchu/genres.json
```

Mỗi item là một thể loại. Có thể sửa:

- `title`: tên thể loại hiển thị
- `description`: mô tả ở banner trang chi tiết
- `shortDescription`: mô tả ngắn ở card thể loại
- `countLabel`: số truyện hiển thị giả lập
- `readLabel`: lượt đọc hiển thị giả lập
- `image`: ảnh card thể loại
- `heroImage`: ảnh banner trang `/the-loai/[slug]`
- `intro`: đoạn giới thiệu SEO

Ví dụ trang `/the-loai/tien-hiep` lấy dữ liệu từ item có:

```json
"slug": "tien-hiep"
```

## 2. Sửa truyện demo / truyện nổi bật

File:

```txt
data/truyenchu/story-seeds.json
```

Các truyện trong file này được ưu tiên hiển thị trước các truyện sinh tự động từ URL cũ.
Có thể sửa:

- `title`
- `excerpt`
- `summary`
- `categories`
- `categoryNames`
- `cover`
- `thumb`
- `views`
- `rating`

## 3. Sửa menu / footer

File:

```txt
data/truyenchu/site-ui.json
```

Có thể sửa menu header, danh mục footer và chủ đề gợi ý.

## 4. Ảnh giao diện

Ảnh đang nằm tại:

```txt
public/images/truyenchu/
```

Khi thay ảnh mới, chỉ cần giữ đúng đường dẫn trong JSON hoặc sửa đường dẫn trong JSON cho khớp file mới.
