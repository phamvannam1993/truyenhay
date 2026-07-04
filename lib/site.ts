export const siteConfig = {
  name: "TruyenChu.vn",
  legalName: "TruyenChu.vn",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://truyenchu.vn",
  locale: "vi_VN",
  description:
    "Kho tóm tắt truyện chữ, review nhanh, gợi ý đọc và phân loại thể loại. Không đăng tải nguyên văn tác phẩm.",
  slogan: "Tóm tắt truyện nhanh, sạch bản quyền, dễ chọn truyện hay",
  creator: "TruyenChu.vn Editorial",
  sameAs: [] as string[],
};

export const editorialPolicy = {
  title: "Chính sách nội dung",
  points: [
    "Không đăng nguyên văn truyện, không copy chương truyện từ nguồn khác.",
    "Mỗi trang tập trung vào tóm tắt, review, motif, nhân vật, điểm nên đọc và ghi chú biên tập.",
    "Trang chưa có nội dung biên tập đủ chất lượng có thể để noindex hoặc chưa đưa vào sitemap.",
    "Khi có yêu cầu của chủ sở hữu quyền, cần gỡ/sửa nội dung liên quan ngay.",
  ],
};
