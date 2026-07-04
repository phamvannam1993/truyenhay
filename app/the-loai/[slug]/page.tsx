import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryPages,
  genreContentItems,
  getCategoryPage,
  getGenreContent,
  getSeedStoriesByCategory,
  getStoryDetailContent,
  stories,
  type Story,
} from "@/lib/data";
import { collectionJsonLd, createMetadata, JsonLd } from "@/lib/seo";

const ASSET = "/images";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export function generateStaticParams() {
  return categoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) return {};
  const genre = getGenreContent(slug);

  return createMetadata({
    title: `${page.title} - Tóm tắt & review truyện`,
    description: genre?.description || page.description,
    path: page.path,
    keywords: [page.title, "thể loại truyện", "tóm tắt truyện", "review truyện"],
    noIndex: !page.seoReady,
    image: genre?.heroImage,
  });
}

function cover(story: Story, index: number) {
  const details = getStoryDetailContent(story.slug);
  return details?.image_url || story.cover || `${ASSET}/cover-featured-${String((index % 5) + 1).padStart(2, "0")}.webp` || "/images/default-story-cover.webp";
}

function thumb(story: Story, index: number) {
  const details = getStoryDetailContent(story.slug);
  return details?.image_url || story.thumb || `${ASSET}/thumb-ranking-${String((index % 5) + 1).padStart(2, "0")}.webp` || "/images/default-story-cover.webp";
}

function displayStories(items: Story[], slug: string) {
  return items.map((story) => ({
    ...story,
    categories: story.categories.includes(slug) ? story.categories : [slug, ...story.categories],
  }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1"));
  const itemsPerPage = 9;

  const page = getCategoryPage(slug);
  if (!page) {
    notFound();
    return null;
  }

  const genre = getGenreContent(slug);
  const categoryStories = getSeedStoriesByCategory(slug);
  const allStories = displayStories(categoryStories, slug);

  const totalPages = Math.ceil(allStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const shownStories = allStories.slice(startIndex, endIndex);

  const popularGenres = genreContentItems.slice(0, 6);
  const suggestedStories = stories.slice(0, 5);
  const title = genre?.title || page.title;
  const heroImage = genre?.heroImage || "/images/category-hero.webp";

  return (
    <>
      <JsonLd data={collectionJsonLd({
        title: `${title} - Tóm tắt & review truyện`,
        description: genre?.description || page.description,
        path: page.path,
        items: shownStories.map((story) => ({ title: story.title, path: story.path })),
      })} />

      <section className="categoryDetailHero" aria-labelledby="category-detail-title">
        <div className="container-lg">
          <div className="categoryDetailBanner" style={{ backgroundImage: `linear-gradient(90deg, rgba(247,250,255,.94) 0%, rgba(247,250,255,.82) 34%, rgba(247,250,255,.18) 72%), url(${heroImage})` }}>
            <div className="categoryDetailCopy">
              <nav className="categoryDetailBreadcrumb" aria-label="Breadcrumb">
                <Link href="/">⌂ Trang chủ</Link>
                <span>›</span>
                <Link href="/the-loai">Thể loại</Link>
              </nav>
              <h1 id="category-detail-title">Thể loại <span>{title}</span></h1>
              <p>{genre?.description || page.description}</p>
              <div className="categoryHeroStats" aria-label="Thống kê thể loại">
                <span><b>📚</b><strong>{genre?.countLabel || `${categoryStories.length.toLocaleString("vi-VN")} truyện`}</strong><em>Truyện</em></span>
                <span><b>🔥</b><strong>{genre?.readLabel || "Đang cập nhật"}</strong><em>Lượt đọc</em></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-lg categoryDetailLayout">
        <aside className="categoryLeftSidebar" aria-label="Danh mục thể loại">
          <section className="categorySidePanel">
            <h2>Danh mục thể loại</h2>
            <div className="categoryMenuList">
              {genreContentItems.map((item) => (
                <Link key={item.slug} href={item.path} className={item.slug === slug ? "is-current" : undefined}>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
            <Link className="categorySideAction" href="/the-loai">Xem tất cả thể loại →</Link>
          </section>

          <section className="categoryLoginCard">
            <h2>Đọc truyện mọi lúc, mọi nơi</h2>
            <p>Lưu lại truyện yêu thích và đọc tiếp trên mọi thiết bị.</p>
            <Link href="/tim-kiem">Đăng nhập ngay</Link>
          </section>
        </aside>

        <main className="categoryDetailContent">
          <div className="categoryDetailTitleRow">
            <div>
              <h2>{title} <span>{genre?.countLabel || `${categoryStories.length.toLocaleString("vi-VN")} truyện`}</span></h2>
              {page.intro[0] && <p>{page.intro[0]}</p>}
            </div>
            <label className="genreSort">
              <span>Sắp xếp:</span>
              <select defaultValue="new" aria-label="Sắp xếp truyện">
                <option value="new">Mới nhất</option>
                <option value="hot">Hot nhất</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </label>
          </div>

          <div className="categoryFilterTabs" aria-label="Bộ lọc truyện">
            <button type="button" className="is-active">◉ Mới cập nhật</button>
            <button type="button">♡ Hot nhất</button>
            <button type="button">☆ Đánh giá cao</button>
          </div>

          <div className="categoryStoryGrid">
            {shownStories.map((story, index) => (
              <article key={story.slug} className="categoryStoryItem">
                <Link href={story.path} className="categoryStoryCover" aria-label={`Đọc tóm tắt ${story.title}`}>
                  {index < 3 && <span>TOP {index + 1}</span>}
                  <img src={cover(story, index)} alt={`Ảnh minh họa ${story.title}`} loading={index < 3 ? "eager" : "lazy"} />
                </Link>
                <div className="categoryStoryText">
                  <Link href={story.path}><h3>{story.title}</h3></Link>
                  <small>{story.categoryNames[0] || title}</small>
                  <p>{story.excerpt}</p>
                  <div className="categoryStoryMeta">
                    <em>👁 {story.views || `${(128 - index * 11).toFixed(1)}K`}</em>
                    <em>⭐ {(story.rating || (4.8 - index * 0.04)).toFixed(1)}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="categoryPagination" aria-label="Phân trang">
              <Link href={`?page=${Math.max(1, currentPage - 1)}`} aria-label="Trang trước">‹</Link>
              {[...Array(totalPages)].map((_, i) => (
                <Link key={i + 1} href={`?page=${i + 1}`} className={i + 1 === currentPage ? "is-active" : ""}>
                  {i + 1}
                </Link>
              ))}
              <Link href={`?page=${Math.min(totalPages, currentPage + 1)}`} aria-label="Trang sau">›</Link>
            </nav>
          )}
        </main>

        <aside className="categoryRightSidebar" aria-label="Gợi ý đọc">
          <section className="categorySidePanel">
            <h2>Thể loại phổ biến</h2>
            <div className="genrePopularList">
              {popularGenres.map((item) => (
                <Link key={item.slug} href={item.path} className={item.slug === slug ? "is-current" : undefined}>
                  <strong>{item.title}</strong>
                  <em>{item.countLabel}</em>
                </Link>
              ))}
            </div>
          </section>

          <section className="categorySidePanel">
            <h2>Gợi ý dành cho bạn</h2>
            <div className="genreSuggestList">
              {suggestedStories.map((story, index) => (
                <Link key={story.slug} href={story.path}>
                  <img src={thumb(story, index)} alt={`Ảnh ${story.title}`} loading="lazy" />
                  <span>
                    <strong>{story.title}</strong>
                    <small>{story.categoryNames[0] || "Tóm tắt"}</small>
                  </span>
                  <em>★ {(story.rating || (4.8 - index * 0.1)).toFixed(1)}</em>
                </Link>
              ))}
            </div>
            <Link className="categorySideAction" href="/danh-sach/truyen-hot">Xem thêm gợi ý →</Link>
          </section>
        </aside>
      </section>
    </>
  );
}
