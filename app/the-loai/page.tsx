import type { Metadata } from "next";
import Link from "next/link";
import { categoryPages, genreContentItems, getStoriesByCategory, getStoryDetailContent, stories } from "@/lib/data";
import { collectionJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const ASSET = "/images";

const preferredSlugs = genreContentItems.map((genre) => genre.slug);

export const metadata: Metadata = {
  title: "Thể loại truyện - Tóm tắt truyện theo chủ đề | TruyenChu.vn",
  description: "Khám phá các thể loại truyện tóm tắt: tiên hiệp, huyền huyễn, kiếm hiệp, ngôn tình, đô thị, trọng sinh, hệ thống và nhiều chủ đề hấp dẫn.",
  alternates: { canonical: "/the-loai" },
  openGraph: {
    title: "Thể loại truyện - TruyenChu.vn",
    description: "Tìm truyện theo thể loại và đọc bản tóm tắt nhanh, dễ hiểu.",
    url: `${siteConfig.url}/the-loai`,
    siteName: siteConfig.name,
    locale: "vi_VN",
    images: [{ url: "/images/category-hero.webp", width: 1200, height: 430, alt: "Thể loại truyện" }],
  },
};

function getCategory(slug: string) {
  return categoryPages.find((cat) => cat.slug === slug);
}

function countText(slug: string) {
  const count = getStoriesByCategory(slug).length;
  return `${count.toLocaleString("vi-VN")} truyện`;
}

export default function GenresPage() {
  const mainCategories = preferredSlugs
    .map((slug) => getCategory(slug))
    .filter((cat): cat is (typeof categoryPages)[number] => Boolean(cat));
  const extraCategories = categoryPages.filter((cat) => !preferredSlugs.includes(cat.slug)).slice(0, 12);
  const suggestedStories = stories.slice(0, 4);
  const popularCategories = genreContentItems.slice(0, 6);

  return (
    <>
      <JsonLd data={collectionJsonLd({
        title: "Thể loại truyện - TruyenChu.vn",
        description: "Danh mục thể loại truyện tóm tắt trên TruyenChu.vn.",
        path: "/the-loai",
        items: mainCategories.map((cat) => ({ title: cat.title, path: cat.path })),
      })} />

      <section className="genreHero" aria-labelledby="genre-page-title">
        <div className="container-lg">
          <div className="genreHeroBanner">
            <div className="genreHeroCopy">
              <p className="heroKicker">Kho truyện tóm tắt theo chủ đề</p>
              <h1 id="genre-page-title">Khám phá thể loại truyện chữ</h1>
              <h2>Đa dạng thể loại – Đọc là mê</h2>
              <p>Hàng ngàn truyện tóm tắt hấp dẫn thuộc đủ mọi thể loại, giúp bạn chọn đúng gu và nắm cốt truyện nhanh hơn mỗi ngày.</p>
              <form className="genreSearch" action="/tim-kiem" method="get">
                <input name="q" placeholder="Tìm thể loại bạn yêu thích..." aria-label="Tìm thể loại" />
                <button type="submit" aria-label="Tìm kiếm">⌕</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <main className="container-lg genrePageLayout">
        <section className="genreContent">
          <nav className="genreBreadcrumb" aria-label="Breadcrumb">
            <Link href="/">⌂ Trang chủ</Link>
            <span>›</span>
            <span>Thể loại</span>
          </nav>

          <div className="genreTitleRow">
            <h2>Thể loại truyện</h2>
            <label className="genreSort">
              <span>Sắp xếp:</span>
              <select defaultValue="popular" aria-label="Sắp xếp thể loại">
                <option value="popular">Phổ biến nhất</option>
                <option value="name">Theo tên A-Z</option>
                <option value="new">Mới cập nhật</option>
              </select>
            </label>
          </div>

          <div className="genreCardsGrid">
            {mainCategories.map((cat) => {
              const meta = genreContentItems.find((item) => item.slug === cat.slug);
              return (
                <Link key={cat.slug} href={cat.path} className="genreCard">
                  <img src={meta?.image || `${ASSET}/genre-default.webp`} alt={`Ảnh minh họa thể loại ${cat.title}`} loading="lazy" />
                  <div className="genreCardBody">
                    <div className="genreCardTitle">
                      <h3>{cat.title}</h3>
                    </div>
                    <p>{meta?.shortDescription || cat.description}</p>
                    <strong>{meta?.countLabel || countText(cat.slug)}</strong>
                  </div>
                  <span className="genreArrow" aria-hidden="true">→</span>
                </Link>
              );
            })}
          </div>

          {extraCategories.length > 0 && (
            <section className="genreExtraPanel" aria-labelledby="other-genres-title">
              <div className="panelHeader">
                <h2 id="other-genres-title">Thể loại khác</h2>
                <Link href="/tim-kiem">Xem thêm →</Link>
              </div>
              <div className="genreTagGrid">
                {extraCategories.map((cat) => (
                  <Link key={cat.slug} href={cat.path}>#{cat.title}</Link>
                ))}
              </div>
            </section>
          )}
        </section>

        <aside className="genreSidebar" aria-label="Gợi ý thể loại và truyện">
          <section className="genreSidePanel">
            <h2>Thể loại phổ biến</h2>
            <div className="genrePopularList">
              {popularCategories.map((cat) => (
                <Link key={cat.slug} href={cat.path}>
                  <span className={`genreMiniIcon genreIcon-${cat.color}`}>{cat.icon}</span>
                  <strong>{cat.title}</strong>
                  <em>{cat.countLabel}</em>
                  <b>›</b>
                </Link>
              ))}
            </div>
          </section>

          <section className="genreSidePanel">
            <h2>Gợi ý dành cho bạn</h2>
            <div className="genreSuggestList">
              {suggestedStories.map((story, index) => {
                const details = getStoryDetailContent(story.slug);
                const imgSrc = details?.image_url || `${ASSET}/thumb-ranking-${String((index % 5) + 1).padStart(2, "0")}.webp`;
                return (
                <Link key={story.slug} href={story.path}>
                  <img src={imgSrc} alt={`Ảnh ${story.title}`} loading="lazy" />
                  <span>
                    <strong>{story.title}</strong>
                    <small>{story.categoryNames[0] || "Tóm tắt"}</small>
                  </span>
                  <em>★ {(4.9 - index * 0.1).toFixed(1)}</em>
                </Link>
              );
              })}
            </div>
            <Link className="genreSideMore" href="/danh-sach/truyen-hot">Xem tất cả gợi ý →</Link>
          </section>
        </aside>
      </main>
    </>
  );
}
