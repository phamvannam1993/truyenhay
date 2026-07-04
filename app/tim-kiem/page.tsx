import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { StoryGrid } from "@/components/StoryGrid";
import { genreContentItems, searchStories, storySeedItems, getStoryDetailContent } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Tìm kiếm truyện - TruyenChu.vn",
  description: "Tìm truyện theo tên, thể loại, motif và nội dung tóm tắt.",
  path: "/tim-kiem",
  noIndex: true,
});

type PageProps = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const items = searchStories(q);
  const suggestions = storySeedItems.slice(0, 6);
  const genres = genreContentItems.slice(0, 10);

  return (
    <>
      <section className="searchHero">
        <div className="container searchHeroGrid">
          <div className="searchHeroCopy">
            <p className="eyebrow">Tìm kiếm</p>
            <h1>Tìm nhanh tóm tắt truyện cần đọc</h1>
            <p>Nhập tên truyện, thể loại hoặc motif như tiên hiệp, hệ thống, trọng sinh, đô thị. Trang tìm kiếm để noindex nhằm tránh index URL tham số rác.</p>
            <SearchBox defaultValue={q} />
          </div>
          <div className="searchHeroPanel">
            <strong>Gợi ý tìm nhanh</strong>
            <div className="searchQuickTags">
              {genres.map((genre) => <Link key={genre.slug} href={`/tim-kiem?q=${encodeURIComponent(genre.title)}`}>{genre.title}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section searchResultSection">
        <div className="container searchLayout">
          <main className="searchMain">
            <div className="searchResultHeader">
              <div>
                <p className="eyebrow">Kết quả</p>
                <h2>{q ? `Kết quả cho “${q}”` : "Nhập từ khóa để tìm"}</h2>
                <p>{q ? `${items.length} truyện phù hợp với từ khóa.` : "Bạn có thể tìm theo tên truyện, thể loại hoặc slug cũ không dấu."}</p>
              </div>
            </div>
            <StoryGrid stories={items} />
          </main>

          <aside className="searchSidebar">
            <div className="searchSideCard">
              <h2>Truyện gợi ý</h2>
              {suggestions.map((story) => {
                const details = getStoryDetailContent(story.slug);
                const imgSrc = details?.image_url || story.thumb || story.cover;
                return (
                <Link key={story.slug} href={story.path}>
                  <img src={imgSrc} alt={story.title} />
                  <span>
                    <strong>{story.title}</strong>
                    <small>{story.categoryNames.slice(0, 2).join(" · ")}</small>
                  </span>
                </Link>
              );
              })}
            </div>
            <div className="searchSideCard soft">
              <h2>Mẹo nhập từ khóa</h2>
              <p>Ưu tiên từ khóa ngắn: “tiên hiệp”, “trọng sinh”, “đô thị”, hoặc tên truyện không dấu để tăng khả năng khớp dữ liệu.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
