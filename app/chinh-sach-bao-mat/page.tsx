import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Chính sách bảo mật - TruyenChu.vn",
  description: "Chính sách bảo mật của TruyenChu.vn - Cách chúng tôi bảo vệ thông tin cá nhân và dữ liệu của bạn.",
  alternates: { canonical: "https://truyenchu.vn/chinh-sach-bao-mat" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <Breadcrumbs items={[{ label: "Chính sách bảo mật" }]} />
          <h1>Chính sách bảo mật</h1>
          <p className="lead">Cách chúng tôi bảo vệ thông tin cá nhân và dữ liệu của bạn.</p>
        </div>
      </section>

      <div className="container article-layout">
        <article className="article-main">
          <section className="content-card">
            <h2>1. Giới thiệu</h2>
            <p>
              TruyenChu.vn ("chúng tôi" hoặc "công ty") cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập và sử dụng trang web TruyenChu.vn.
            </p>
            <p>
              Vui lòng đọc chính sách bảo mật này cẩn thận. Nếu bạn không đồng ý với các hoạt động của chúng tôi được mô tả trong chính sách này, bạn không nên sử dụng trang web của chúng tôi.
            </p>
          </section>

          <section className="content-card">
            <h2>2. Thông tin chúng tôi thu thập</h2>
            <p>Chúng tôi có thể thu thập các loại thông tin sau từ bạn:</p>
            <ul className="clean-list">
              <li><strong>Thông tin liên hệ:</strong> Khi bạn liên hệ với chúng tôi, chúng tôi có thể thu thập tên, email, chủ đề tin nhắn và nội dung của tin nhắn của bạn.</li>
              <li><strong>Thông tin trình duyệt:</strong> Chúng tôi tự động thu thập thông tin về thiết bị của bạn, trình duyệt, địa chỉ IP, và các trang bạn truy cập trên trang web của chúng tôi.</li>
              <li><strong>Cookies và công nghệ theo dõi:</strong> Chúng tôi sử dụng cookies và các công nghệ tương tự để theo dõi hoạt động trên trang web và cải thiện trải nghiệm người dùng.</li>
              <li><strong>Thông tin phân tích:</strong> Chúng tôi thu thập dữ liệu phân tích để hiểu cách bạn sử dụng trang web của chúng tôi.</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>3. Cách chúng tôi sử dụng thông tin</h2>
            <p>Chúng tôi sử dụng thông tin chúng tôi thu thập cho các mục đích sau:</p>
            <ul className="clean-list">
              <li>Cung cấp, duy trì và cải thiện trang web và các dịch vụ của chúng tôi</li>
              <li>Xử lý các yêu cầu liên hệ và cung cấp hỗ trợ khách hàng</li>
              <li>Gửi thông báo, cập nhật và thông tin khác mà bạn yêu cầu</li>
              <li>Phân tích cách người dùng sử dụng trang web của chúng tôi để tối ưu hóa trải nghiệm người dùng</li>
              <li>Ngăn chặn gian lận và đảm bảo tính bảo mật của trang web</li>
              <li>Tuân thủ với luật pháp và quy định hiện hành</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>4. Chia sẻ thông tin của bạn</h2>
            <p>
              Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn cho các bên thứ ba vì mục đích tiếp thị của họ. Chúng tôi chỉ chia sẻ thông tin của bạn trong các trường hợp sau:
            </p>
            <ul className="clean-list">
              <li><strong>Những bên thứ ba được ủy quyền:</strong> Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ đáng tin cậy để giúp chúng tôi cung cấp dịch vụ của mình.</li>
              <li><strong>Yêu cầu pháp lý:</strong> Chúng tôi có thể tiết lộ thông tin của bạn nếu được yêu cầu bởi luật pháp hoặc khi tin rằng việc tiết lộ như vậy là cần thiết để bảo vệ quyền của chúng tôi.</li>
              <li><strong>Chuyển nhượng kinh doanh:</strong> Nếu TruyenChu.vn được mua lại hoặc hợp nhất với một công ty khác, thông tin của bạn có thể được chuyển giao như một phần của giao dịch đó.</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>5. Bảo mật dữ liệu</h2>
            <p>
              Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi sự tiếp cận, sửa đổi hoặc tiết lộ trái phép. Tuy nhiên, không có phương pháp truyền dữ liệu qua internet nào là 100% an toàn. Chúng tôi không thể đảm bảo tuyệt đối về bảo mật của thông tin của bạn.
            </p>
          </section>

          <section className="content-card">
            <h2>6. Cookies</h2>
            <p>
              Trang web của chúng tôi sử dụng cookies để cung cấp trải nghiệm người dùng tốt hơn. Cookies là các tệp nhỏ được lưu trữ trên thiết bị của bạn. Bạn có thể kiểm soát việc sử dụng cookies thông qua cài đặt trình duyệt của mình, nhưng việc vô hiệu hóa cookies có thể ảnh hưởng đến chức năng của trang web.
            </p>
          </section>

          <section className="content-card">
            <h2>7. Quyền của bạn</h2>
            <p>Tùy thuộc vào khu vực pháp lý của bạn, bạn có thể có các quyền sau:</p>
            <ul className="clean-list">
              <li><strong>Quyền truy cập:</strong> Bạn có quyền yêu cầu truy cập thông tin cá nhân mà chúng tôi nắm giữ về bạn.</li>
              <li><strong>Quyền sửa đổi:</strong> Bạn có quyền yêu cầu chúng tôi sửa đổi hoặc cập nhật thông tin không chính xác.</li>
              <li><strong>Quyền xóa:</strong> Bạn có quyền yêu cầu chúng tôi xóa thông tin cá nhân của bạn, với một số ngoại lệ.</li>
              <li><strong>Quyền từ chối:</strong> Bạn có quyền từ chối việc xử lý nhất định của dữ liệu của bạn.</li>
            </ul>
            <p>
              Để thực hiện bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi bằng cách sử dụng thông tin liên hệ được cung cấp dưới đây.
            </p>
          </section>

          <section className="content-card">
            <h2>8. Liên hệ với chúng tôi</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc các hoạt động bảo mật dữ liệu của chúng tôi, vui lòng liên hệ với chúng tôi qua:
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/lien-he" className="btn">
                📧 Liên hệ với chúng tôi
              </Link>
              <Link href="/cau-hoi-thuong-gap" className="btn btn-secondary">
                ❓ Xem câu hỏi thường gặp
              </Link>
            </div>
          </section>

          <section className="content-card">
            <h2>9. Cập nhật chính sách</h2>
            <p>
              Chúng tôi có quyền cập nhật chính sách bảo mật này bất cứ lúc nào. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang web này. Việc tiếp tục sử dụng trang web của chúng tôi sau khi thay đổi được coi là chấp nhận chính sách bảo mật cập nhật.
            </p>
          </section>

          <section className="content-card">
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "32px" }}>
              Cập nhật lần cuối: Tháng 7 năm 2026
            </p>
          </section>
        </article>

        <aside className="sidebar">
          <section className="content-card">
            <h2>Nhanh nhất biết</h2>
            <ul className="clean-list" style={{ fontSize: "0.95rem" }}>
              <li><Link href="/gioi-thieu">📖 Giới thiệu</Link></li>
              <li><Link href="/huong-dan-su-dung">📚 Hướng dẫn sử dụng</Link></li>
              <li><Link href="/cau-hoi-thuong-gap">❓ Câu hỏi thường gặp</Link></li>
              <li><Link href="/lien-he">📧 Liên hệ</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
