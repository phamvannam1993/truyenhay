"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import siteUi from "@/data/truyenchu/site-ui.json";

type NavItem = { href: string; label: string; match: "exact" | "prefix" | "never" };

function isActive(item: NavItem, pathname: string) {
  if (item.match === "never") return false;
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function Header() {
  const pathname = usePathname() || "/";
  const nav = siteUi.nav as NavItem[];

  return (
    <header className="site-header">
      <div className="container-lg header-inner optimized-header">
        <Link href="/" className="brand" aria-label="TruyenChu.vn trang chủ">
          <img src="/images/logo-book.svg" alt="" className="brand-logo" />
          <span>
            <strong>TruyenChu.vn</strong>
            <small>Tóm tắt truyện, review sạch</small>
          </span>
        </Link>

        <nav className="main-nav optimized-nav" aria-label="Điều hướng chính">
          {nav.map((item) => {
            const active = isActive(item, pathname);
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form className="header-search optimized-search" action="/tim-kiem" method="get" aria-label="Tìm kiếm truyện">
          <input name="q" type="search" placeholder="Tìm truyện, thể loại..." />
          <button type="submit" aria-label="Tìm kiếm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>

        <div className="header-actions optimized-actions">
          <Link className="header-btn" href="/danh-sach/truyen-moi"><span>✦</span> Mới</Link>
          <Link className="header-btn primary" href="/danh-sach/truyen-hot">Hot</Link>
        </div>
      </div>
    </header>
  );
}
