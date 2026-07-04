Đã tối ưu thêm cho các trang:

- /danh-sach/truyen-moi: giao diện danh sách Truyện mới, hero riêng, card nổi bật, sidebar.
- /danh-sach/truyen-hot: giao diện danh sách Truyện hot, hero riêng, card nổi bật, sidebar.
- /tim-kiem: giao diện tìm kiếm mới, tag gợi ý, sidebar truyện đề xuất.
- /truyen-moi: shortcut redirect về /danh-sach/truyen-moi.
- components/Header.tsx: menu gọn hơn, bỏ mục trùng, tối ưu responsive mobile dạng thanh cuộn ngang.
- components/StoryCard.tsx: card danh sách đã dùng ảnh bìa thật từ JSON thay vì ô chữ cái.

Dữ liệu menu sửa tại:
data/truyenchu/site-ui.json

Dữ liệu truyện sửa tại:
data/truyenchu/story-seeds.json
