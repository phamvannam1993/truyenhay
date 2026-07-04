import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Hướng dẫn sử dụng - TruyenChu.vn",
  description: "Hướng dẫn chi tiết cách sử dụng TruyenChu.vn để tìm kiếm, khám phá và đọc tóm tắt truyện yêu thích.",
  alternates: { canonical: "https://truyenchu.vn/huong-dan-su-dung" },
};

export default function GuidePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <Breadcrumbs items={[{ label: "Hướng dẫn sử dụng" }]} />
          <h1>Hướng dẫn sử dụng TruyenChu.vn</h1>
          <p className="lead">Khám phá cách sử dụng nền tảng của chúng tôi để tìm và đọc truyện yêu thích.</p>
        </div>
      </section>

      <div className="container article-layout">
        <article className="article-main">
          <section className="content-card">
            <h2>1. Tìm kiếm truyện</h2>
            <p>
              Để tìm truyện mà bạn yêu thích, hãy sử dụng thanh tìm kiếm ở phía trên cùng của trang. Bạn có thể:
            </p>
            <ul className="clean-list">
              <li>Nhập tên truyện bạn muốn tìm</li>
              <li>Tìm kiếm theo tên tác giả</li>
              <li>Sử dụng các từ khóa liên quan</li>
            </ul>
            <p>
              Kết quả tìm kiếm sẽ hiển thị danh sách các truyện phù hợp cùng với tóm tắt ngắn gọn.
            </p>
          </section>

          <section className="content-card">
            <h2>2. Khám phá theo thể loại</h2>
            <p>
              Nếu bạn chưa biết truyện nào để đọc, hãy thử khám phá theo thể loại:
            </p>
            <ul className="clean-list">
              <li>Bấm vào "Thể loại" trong menu chính</li>
              <li>Chọn thể loại bạn quan tâm (Tiên Hiệp, Huyền Huyễn, Ngôn Tình, v.v.)</li>
              <li>Duyệt danh sách truyện trong thể loại đó</li>
            </ul>
            <p>
              Mỗi thể loại có phần mô tả chi tiết giúp bạn hiểu rõ hơn về những gì bạn sẽ tìm thấy.
            </p>
          </section>

          <section className="content-card">
            <h2>3. Xem tóm tắt truyện</h2>
            <p>
              Khi bạn tìm thấy một truyện quan tâm:
            </p>
            <ul className="clean-list">
              <li>Bấm vào tiêu đề truyện hoặc ảnh bìa</li>
              <li>Xem phần tóm tắt chi tiết</li>
              <li>Đọc bài review để biết cốt truyện chính mà không spoil</li>
              <li>Xem các nhân vật chính và tuyến nhân vật quan trọng</li>
              <li>Kiểm tra các thẻ nội dung để biết loại truyện này có phù hợp không</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>4. Sử dụng bộ lọc</h2>
            <p>
              Trên trang danh mục thể loại, bạn có thể sử dụng các công cụ lọc:
            </p>
            <ul className="clean-list">
              <li><strong>Sắp xếp:</strong> Sắp xếp theo Mới nhất, Hot nhất, hoặc Đánh giá cao</li>
              <li><strong>Bộ lọc tab:</strong> Lọc theo các tiêu chí khác nhau</li>
              <li><strong>Phân trang:</strong> Chuyển giữa các trang để khám phá thêm truyện</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>5. Đọc ghi chú chương</h2>
            <p>
              Một số truyện cung cấp ghi chú chi tiết cho từng chương:
            </p>
            <ul className="clean-list">
              <li>Truy cập trang truyện và chọn một chương</li>
              <li>Đọc ghi chú tóm tắt sự kiện chính</li>
              <li>Sử dụng ghi chú để nắm bắt nhanh nội dung chương</li>
              <li>Xem những điều nổi bật và câu hỏi khiến bạn muốn đọc tiếp</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>6. Duyệt danh sách đề xuất</h2>
            <p>
              TruyenChu.vn cung cấp các danh sách đề xuất được curated:
            </p>
            <ul className="clean-list">
              <li><strong>Truyện mới:</strong> Các tác phẩm vừa được thêm gần đây</li>
              <li><strong>Truyện hot:</strong> Những truyện được quan tâm nhất hiện nay</li>
              <li><strong>Danh sách thể loại:</strong> Tuyển chọn đặc biệt trong từng thể loại</li>
            </ul>
            <p>
              Nhấp vào "Danh sách" trong menu để khám phá tất cả các danh sách có sẵn.
            </p>
          </section>

          <section className="content-card">
            <h2>7. Mẹo sử dụng hiệu quả</h2>
            <ul className="clean-list">
              <li>📱 <strong>Sử dụng trên di động:</strong> Trang web hoàn toàn responsive, bạn có thể sử dụng trên điện thoại, máy tính bảng hoặc máy tính để bàn.</li>
              <li>🔍 <strong>Sử dụng từ khóa cụ thể:</strong> Tìm kiếm càng cụ thể, kết quả càng chính xác.</li>
              <li>⭐ <strong>Kiểm tra đánh giá:</strong> Xem rating và lượt đọc để biết truyện được ưa thích hay không.</li>
              <li>🏷️ <strong>Xem tag nội dung:</strong> Các thẻ này giúp bạn nhanh chóng nhận biết điểm nhấn của truyện.</li>
              <li>💬 <strong>Phản hồi cho chúng tôi:</strong> Nếu bạn có đề xuất, hãy liên hệ để giúp chúng tôi cải thiện.</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>Cần hỗ trợ thêm?</h2>
            <p>
              Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng:
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/cau-hoi-thuong-gap" className="btn btn-secondary">
                ❓ Xem FAQ
              </Link>
              <Link href="/lien-he" className="btn">
                📧 Liên hệ với chúng tôi
              </Link>
            </div>
          </section>
        </article>

        <aside className="sidebar">
          <section className="content-card">
            <h2>Nhanh nhất biết</h2>
            <ul className="clean-list" style={{ fontSize: "0.95rem" }}>
              <li>🔍 <Link href="/tim-kiem">Tìm kiếm truyện</Link></li>
              <li>📚 <Link href="/the-loai">Khám phá thể loại</Link></li>
              <li>⭐ <Link href="/danh-sach/truyen-hot">Truyện hot nhất</Link></li>
              <li>✨ <Link href="/danh-sach/truyen-moi">Truyện mới nhất</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
