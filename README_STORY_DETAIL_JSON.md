# Trang chi tiết truyện

Đã thêm giao diện chi tiết truyện cho route dạng:

```txt
/dai-dao-doc-ton
/van-co-than-de
/than-dao-dan-ton
```

## File dữ liệu cần sửa

### 1. `data/truyenchu/story-seeds.json`
Sửa dữ liệu cơ bản của truyện:

```txt
title, slug, path, categories, categoryNames, cover, thumb, excerpt, summary, views, rating, rank
```

### 2. `data/truyenchu/story-details.json`
Sửa dữ liệu riêng cho trang chi tiết:

```txt
subtitle, author, status, sourceType, wordCount, tone, highlights, characters, readingGuide, editorNote, chapters
```

## Lưu ý nội dung

Trang chi tiết được thiết kế theo hướng tóm tắt/review, không đăng full truyện và không sao chép chương truyện.
