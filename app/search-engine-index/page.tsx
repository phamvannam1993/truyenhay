import Link from "next/link";
import { stories, categoryPages, listPages } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
  title: "Search Engine Index",
};

export default function SearchEngineIndexPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Search Engine Index (Noindex)</h1>
      <p>This page helps search engines discover all content on the site.</p>

      <h2>Static Pages (10)</h2>
      <ul>
        <li><Link href="/">Trang chủ</Link></li>
        <li><Link href="/the-loai">Thể loại</Link></li>
        <li><Link href="/danh-sach/truyen-moi">Truyện mới</Link></li>
        <li><Link href="/danh-sach/truyen-hot">Truyện hot</Link></li>
        <li><Link href="/tim-kiem">Tìm kiếm</Link></li>
        <li><Link href="/gioi-thieu">Giới thiệu</Link></li>
        <li><Link href="/huong-dan-su-dung">Hướng dẫn sử dụng</Link></li>
        <li><Link href="/cau-hoi-thuong-gap">Câu hỏi thường gặp</Link></li>
        <li><Link href="/lien-he">Liên hệ</Link></li>
        <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
      </ul>

      <h2>Category Pages ({categoryPages.length})</h2>
      <ul>
        {categoryPages.map((cat) => (
          <li key={cat.slug}><Link href={cat.path}>{cat.title}</Link></li>
        ))}
      </ul>

      <h2>List Pages ({listPages.length})</h2>
      <ul>
        {listPages.map((list) => (
          <li key={list.slug}><Link href={list.path}>{list.title}</Link></li>
        ))}
      </ul>

      <h2>Story Pages ({stories.length})</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.slug}><Link href={story.path}>{story.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}
