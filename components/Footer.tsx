import Link from "next/link";
import siteUi from "@/data/truyenchu/site-ui.json";
import { siteConfig } from "@/lib/site";

type FooterLink = { href: string; label: string };

export function Footer() {
  const footerCategories = siteUi.footerCategories as FooterLink[];

  return (
    <footer className="site-footer">
      <div className="container-lg footer-grid">
        <section className="footer-brand-block">
          <Link href="/" className="footer-brand">
            <img src="/images/logo-book.svg" alt="" />
            <span>
              <strong>{siteConfig.name}</strong>
              <small>Tóm tắt truyện hay mỗi ngày</small>
            </span>
          </Link>
          <p>Nền tảng tóm tắt truyện hàng đầu, giúp bạn đọc nhanh – hiểu trọn – chọn đúng truyện hay mỗi ngày.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="TikTok">♪</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="Instagram">◎</a>
          </div>
        </section>

        <section className="footer-section">
          <h3>Khám phá</h3>
          <ul>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/the-loai">Thể loại</Link></li>
            <li><Link href="/danh-sach/truyen-moi">Truyện mới</Link></li>
            <li><Link href="/danh-sach/truyen-hot">Tóm tắt nổi bật</Link></li>
            <li><Link href="/tim-kiem">Tìm kiếm</Link></li>
          </ul>
        </section>

        <section className="footer-section">
          <h3>Thể loại</h3>
          <ul>
            {footerCategories.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </section>

        <section className="footer-section">
          <h3>Hỗ trợ</h3>
          <ul>
            <li><Link href="/gioi-thieu">Giới thiệu</Link></li>
            <li><Link href="/huong-dan-su-dung">Hướng dẫn sử dụng</Link></li>
            <li><Link href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</Link></li>
            <li><Link href="/lien-he">Liên hệ</Link></li>
            <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
          </ul>
        </section>

        <section className="footer-newsletter">
          <h3>Đăng ký nhận tin</h3>
          <p>Nhận thông báo truyện mới và tóm tắt nổi bật mỗi tuần qua email.</p>
          <form>
            <input type="email" placeholder="Nhập email của bạn..." aria-label="Email đăng ký" />
            <button type="button">Đăng ký</button>
          </form>
        </section>
      </div>

      <div className="container-lg footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
        <span>Đọc nhanh – Hiểu trọn – Chọn đúng truyện hay!</span>
        <a href="#top">Về đầu trang ↑</a>
      </div>
    </footer>
  );
}
