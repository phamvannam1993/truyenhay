import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryGrid } from "@/components/StoryGrid";
import { getListPage, getStoriesForList, getStoryDetailContent, listPages } from "@/lib/data";
import { collectionJsonLd, createMetadata, JsonLd } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

const listTheme: Record<string, { eyebrow: string; icon: string; intro: string; cta: string }> = {
  "truyen-moi": {
    eyebrow: "Cập nhật mới",
    icon: "✦",
    intro: "Các bài tóm tắt và review truyện mới được đưa lên hệ thống. Ưu tiên nội dung ngắn, dễ hiểu, giúp người đọc quyết định có nên theo dõi truyện hay không.",
    cta: "Xem truyện mới",
  },
  "truyen-hot": {
    eyebrow: "Đang được quan tâm",
    icon: "🔥",
    intro: "Bảng chọn truyện nổi bật theo mức độ hấp dẫn, độ dễ đọc và khả năng giữ chân độc giả. Phù hợp làm trang kéo traffic chính cho site.",
    cta: "Xem truyện hot",
  },
};

export function generateStaticParams() {
  return listPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getListPage(slug);
  if (!page) return {};
  return createMetadata({
    title: `${page.title} - Tóm tắt truyện hay`,
    description: page.description,
    path: page.path,
    keywords: [page.title, "danh sách truyện", "truyện hay", "tóm tắt truyện", "review truyện"],
    noIndex: !page.seoReady,
  });
}

export default async function ListPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getListPage(slug);
  if (!page) {
    notFound();
    return null;
  }

  const items = getStoriesForList(slug);
  const theme = listTheme[slug] || {
    eyebrow: "Danh sách truyện",
    icon: "▣",
    intro: page.description,
    cta: "Xem danh sách",
  };
  const topItems = items.slice(0, 3);
  const restItems = items.slice(3);

  return (
    <>
      <JsonLd data={collectionJsonLd({
        title: `${page.title} - Tuyển chọn tóm tắt truyện`,
        description: page.description,
        path: page.path,
        items: items.map((story) => ({ title: story.title, path: story.path })),
      })} />

      <section className={`listHero listHero-${slug}`}>
        <div className="container">
          <div className="listHeroCard">
            <div className="listHeroCopy">
              <p className="eyebrow">{theme.eyebrow}</p>
              <h1><span>{theme.icon}</span> {page.title}</h1>
              <p>{theme.intro}</p>
              <div className="listHeroActions">
                <a href="#list-content">{theme.cta}</a>
                <Link href="/the-loai">Duyệt theo thể loại</Link>
              </div>
            </div>
            <div className="listHeroStats" aria-label="Thống kê nhanh">
              <span><strong>{items.length}</strong><em>truyện gợi ý</em></span>
              <span><strong>Review</strong><em>không đăng full truyện</em></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section listFeaturedSection">
        <div className="container">
          <div className="listSectionTitle">
            <p className="eyebrow">Nổi bật đầu danh sách</p>
            <h2>{slug === "truyen-moi" ? "Truyện mới nên đọc trước" : "Truyện hot đang được chú ý"}</h2>
            <p>Ba mục đầu được trình bày lớn hơn để tăng tỉ lệ click và giữ chân người đọc ngay khi vào trang.</p>
          </div>
          <div className="listFeaturedContainer">
            {topItems.length > 0 && (() => {
              const story = topItems[0];
              const details = getStoryDetailContent(story.slug);
              const imgSrc = details?.image_url || story.cover || story.thumb || "/images/default-story-cover.webp";
              return (
                <Link href={story.path} className="listFeatureLarge" key={story.slug}>
                  <img src={imgSrc} alt={story.title} />
                  <div className="listFeatureLargeContent">
                    <span>#128</span>
                    <h3>{story.title}</h3>
                    <p>{story.excerpt}</p>
                  </div>
                </Link>
              );
            })()}
            {topItems.length > 1 && (
              <div className="listFeaturedGrid">
                {topItems.slice(1).map((story, index) => {
                  const details = getStoryDetailContent(story.slug);
                  const imgSrc = details?.image_url || story.cover || story.thumb || "/images/default-story-cover.webp";
                  return (
                  <Link href={story.path} className="listFeatureCard" key={story.slug}>
                    <img src={imgSrc} alt={story.title} />
                    <div>
                      <span>{index + 2 < 10 ? `0${index + 2}` : index + 2}</span>
                      <h3>{story.title}</h3>
                      <p>{story.excerpt}</p>
                      <small>{story.categoryNames.slice(0, 2).join(" · ")} · {story.views || "Tóm tắt truyện"}</small>
                    </div>
                  </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="list-content" className="section listContentSection">
        <div className="container listPageLayout">
          <main className="listPageMain">
            <div className="listToolbar">
              <div>
                <p className="eyebrow">Tất cả</p>
                <h2>{page.title}</h2>
              </div>
              <div className="listFilterPills" aria-label="Bộ lọc demo">
                <span className="is-active">Tất cả</span>
                <span>Ngắn gọn</span>
                <span>Dễ đọc</span>
                <span>Đáng theo dõi</span>
              </div>
            </div>
            <StoryGrid stories={restItems.length ? restItems : items} />
          </main>

          <aside className="listPageSidebar" aria-label="Gợi ý danh sách">
            <div className="listSideCard">
              <h2>Danh sách nhanh</h2>
              <Link className={slug === "truyen-moi" ? "is-current" : undefined} href="/danh-sach/truyen-moi">Truyện mới</Link>
              <Link className={slug === "truyen-hot" ? "is-current" : undefined} href="/danh-sach/truyen-hot">Truyện hot</Link>
              <Link href="/the-loai/tien-hiep">Tiên hiệp</Link>
              <Link href="/the-loai/huyen-huyen">Huyền huyễn</Link>
              <Link href="/the-loai/ngon-tinh">Ngôn tình</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
