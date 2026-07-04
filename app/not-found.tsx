import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container narrow content-card">
        <p className="eyebrow">404</p>
        <h1>Chưa có trang này</h1>
        <p className="lead">URL có thể chưa được nhập vào hệ thống hoặc trang đang chờ biên tập.</p>
        <SearchBox />
        <div className="hero-actions">
          <Link className="btn" href="/">Về trang chủ</Link>
          <Link className="btn-ghost" href="/danh-sach/truyen-hot">Xem truyện hot</Link>
        </div>
      </div>
    </section>
  );
}
