import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Giới thiệu TruyenChu.vn - Nền tảng tóm tắt truyện hàng đầu",
  description: "Tìm hiểu về TruyenChu.vn - nền tảng tóm tắt truyện chữ hay nhất Việt Nam, giúp bạn đọc nhanh, hiểu trọn, chọn đúng truyện yêu thích.",
  alternates: { canonical: "https://truyenchu.vn/gioi-thieu" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <Breadcrumbs items={[{ label: "Giới thiệu" }]} />
          <h1>Về TruyenChu.vn</h1>
          <p className="lead">Nền tảng tóm tắt truyện hàng đầu, giúp bạn đọc nhanh – hiểu trọn – chọn đúng truyện hay.</p>
        </div>
      </section>

      <div className="container article-layout">
        <article className="article-main">
          <section className="content-card">
            <h2>Sứ mệnh của chúng tôi</h2>
            <p>
              TruyenChu.vn được thành lập với mục đích giúp độc giả Việt Nam tiếp cận các tác phẩm văn học, tiểu thuyết truyện chữ một cách hiệu quả và tiện lợi nhất. Chúng tôi tin rằng mỗi người đều xứng đáng có cơ hội để khám phá những câu chuyện tuyệt vời mà không phải tốn quá nhiều thời gian.
            </p>
          </section>

          <section className="content-card">
            <h2>Tại sao chọn TruyenChu.vn?</h2>
            <ul className="clean-list">
              <li><strong>Tóm tắt chất lượng cao:</strong> Mỗi bài tóm tắt được biên tập cẩn thận, giúp bạn nắm bắt nội dung chính mà không bỏ sót chi tiết quan trọng.</li>
              <li><strong>Đa dạng thể loại:</strong> Từ Tiên Hiệp, Huyền Huyễn, Kiếm Hiệp đến Ngôn Tình, Đô Thị – chúng tôi có tất cả các thể loại truyện bạn yêu thích.</li>
              <li><strong>Review không spoil:</strong> Các bài review của chúng tôi giúp bạn quyết định có nên đọc hay không, mà không hé lộ kết cục.</li>
              <li><strong>Cập nhật thường xuyên:</strong> Thư viện truyện của chúng tôi được cập nhật liên tục với những tác phẩm mới nhất.</li>
              <li><strong>Giao diện thân thiện:</strong> Dễ sử dụng, nhanh tải, tối ưu cho mọi thiết bị.</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>Cam kết của chúng tôi</h2>
            <p>
              Chúng tôi cam kết:
            </p>
            <ul className="clean-list">
              <li>Cung cấp nội dung tóm tắt nguyên bản, không sao chép truyện full</li>
              <li>Tuân thủ đầy đủ quyền tác giả và bản quyền</li>
              <li>Liên tục cải thiện chất lượng dịch vụ dựa trên phản hồi của bạn</li>
              <li>Bảo vệ thông tin cá nhân của người dùng</li>
              <li>Cung cấp dịch vụ hoàn toàn miễn phí</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>Thống kê của chúng tôi</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">13+</div>
                <div className="stat-label">Truyện</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Thể loại</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Miễn phí</div>
              </div>
            </div>
          </section>

          <section className="content-card">
            <h2>Liên hệ với chúng tôi</h2>
            <p>Bạn có câu hỏi hoặc đề xuất? Chúng tôi rất mong nhận được ý kiến từ bạn!</p>
            <Link href="/lien-he" className="btn">📧 Gửi thông tin liên hệ</Link>
          </section>
        </article>

        <aside className="sidebar">
          <section className="content-card">
            <h2>Nhanh nhất biết</h2>
            <ul className="clean-list" style={{ fontSize: "0.95rem" }}>
              <li><Link href="/the-loai">📚 Khám phá thể loại</Link></li>
              <li><Link href="/danh-sach/truyen-moi">⭐ Truyện mới nhất</Link></li>
              <li><Link href="/danh-sach/truyen-hot">🔥 Truyện hot nhất</Link></li>
              <li><Link href="/tim-kiem">🔍 Tìm kiếm truyện</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
